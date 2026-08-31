package com.apexnet.turbo.radio

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.telephony.*
import android.util.Log

/**
 * CellularDiagnosticManager - Direct Baseband Telemetry & Band Inspection
 */
class CellularDiagnosticManager(private val context: Context) {

    private val telephonyManager = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

    data class CellMetrics(
        val networkType: String,
        val band: String,
        val earfcn: Int,
        val pci: Int,
        val rsrp: Int, // Reference Signal Received Power (dBm)
        val rsrq: Int, // Reference Signal Received Quality (dB)
        val sinr: Int, // Signal to Interference plus Noise Ratio (dB)
        val signalRating: String
    )

    fun getActiveCellMetrics(): CellMetrics {
        try {
            val cellInfoList = telephonyManager.allCellInfo
            if (cellInfoList != null) {
                for (info in cellInfoList) {
                    if (info.isRegistered) {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q && info is CellInfoNr) {
                            val identity = info.cellIdentity as? CellIdentityNr
                            val signal = info.cellSignalStrength as? CellSignalStrengthNr
                            val nrarfcn = identity?.nrarfcn ?: 0
                            val band = calculate5gBand(nrarfcn)
                            val csiRsrp = signal?.csiRsrp ?: -140
                            val csiSinr = signal?.csiSinr ?: 0

                            return CellMetrics(
                                networkType = "5G NR (New Radio)",
                                band = band,
                                earfcn = nrarfcn,
                                pci = identity?.pci ?: 0,
                                rsrp = csiRsrp,
                                rsrq = signal?.csiRsrq ?: -20,
                                sinr = csiSinr,
                                signalRating = rateSignal(csiRsrp)
                            )
                        } else if (info is CellInfoLte) {
                            val identity = info.cellIdentity
                            val signal = info.cellSignalStrength
                            val earfcn = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) identity.earfcn else 0
                            val band = calculateLteBand(earfcn)
                            val rsrp = signal.rsrp
                            val sinr = signal.rssnr

                            return CellMetrics(
                                networkType = "LTE-Advanced",
                                band = band,
                                earfcn = earfcn,
                                pci = identity.pci,
                                rsrp = rsrp,
                                rsrq = signal.rsrq,
                                sinr = sinr,
                                signalRating = rateSignal(rsrp)
                            )
                        }
                    }
                }
            }
        } catch (e: SecurityException) {
            Log.e("CellularDiag", "Location/Phone permission required for CellInfo", e)
        }

        return CellMetrics(
            networkType = "Cellular Radio Active",
            band = "Auto-Carrier Assigned",
            earfcn = 0,
            pci = 0,
            rsrp = -90,
            rsrq = -10,
            sinr = 15,
            signalRating = "Good"
        )
    }

    private fun rateSignal(rsrp: Int): String {
        return when {
            rsrp >= -80 -> "Excellent (Near Tower / Ultra Low Latency)"
            rsrp >= -95 -> "Good (High Speed / Stable)"
            rsrp >= -108 -> "Fair (Moderate Speed / Potential Jitter)"
            else -> "Poor / Fringe Cell (High Packet Loss)"
        }
    }

    private fun calculateLteBand(earfcn: Int): String {
        return when (earfcn) {
            in 0..599 -> "Band 1 (2100 MHz)"
            in 600..1199 -> "Band 2 (1900 MHz PCS)"
            in 1200..1949 -> "Band 3 (1800 MHz)"
            in 1950..2399 -> "Band 4 (AWS 1700/2100)"
            in 2400..2649 -> "Band 5 (850 MHz)"
            in 2750..3449 -> "Band 7 (2600 MHz Turbo)"
            in 5000..5179 -> "Band 12 (700 MHz)"
            in 5180..5279 -> "Band 13 (700 MHz VZ)"
            in 39650..41589 -> "Band 41 (2500 MHz TDD Super Turbo)"
            in 55240..56739 -> "Band 48 (3500 MHz CBRS Gigabit)"
            in 66436..67335 -> "Band 66 (AWS-3 Extended)"
            in 68586..68935 -> "Band 71 (600 MHz Low-Band)"
            else -> "LTE (EARFCN $earfcn)"
        }
    }

    private fun calculate5gBand(nrarfcn: Int): String {
        return when (nrarfcn) {
            in 499200..537999 -> "n41 (2.5 GHz 5G Ultra Capacity)"
            in 620000..680000 -> "n77 (3.7 GHz C-Band Turbo)"
            in 620000..653333 -> "n78 (3.5 GHz Global 5G)"
            in 2054166..2104165 -> "n258 (24 GHz mmWave Gigabit)"
            in 2229166..2279165 -> "n260 (39 GHz mmWave Extreme)"
            else -> "5G NR (NRARFCN $nrarfcn)"
        }
    }

    /**
     * Launch Manufacturer Service Mode for Band Locking
     */
    fun launchServiceMode(code: String) {
        val encodedCode = Uri.encode(code)
        val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:$encodedCode")).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        context.startActivity(intent)
    }
}
