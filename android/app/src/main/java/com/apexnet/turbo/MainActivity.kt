package com.apexnet.turbo

import android.app.Activity
import android.content.Intent
import android.net.VpnService
import android.os.Bundle
import android.widget.Toast
import com.apexnet.turbo.mesh.MeshDirectManager
import com.apexnet.turbo.radio.CellularDiagnosticManager
import com.apexnet.turbo.vpn.ApexVpnService

/**
 * MainActivity - Control Hub for ApexNet Turbo Suite
 */
class MainActivity : Activity() {

    private lateinit var radioDiag: CellularDiagnosticManager
    private lateinit var meshManager: MeshDirectManager

    companion object {
        const val VPN_REQUEST_CODE = 0x0F
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        radioDiag = CellularDiagnosticManager(this)
        meshManager = MeshDirectManager(this)

        // Request VPN Permission from Android
        val vpnIntent = VpnService.prepare(this)
        if (vpnIntent != null) {
            startActivityForResult(vpnIntent, VPN_REQUEST_CODE)
        } else {
            onActivityResult(VPN_REQUEST_CODE, RESULT_OK, null)
        }

        // Start Off-grid Mesh listener
        meshManager.startMeshRelayServer()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == VPN_REQUEST_CODE && resultCode == RESULT_OK) {
            val serviceIntent = Intent(this, ApexVpnService::class.java)
            startService(serviceIntent)
            Toast.makeText(this, "ApexNet Turbo Anti-Throttle Engine Armed (TTL=65)", Toast.LENGTH_LONG).show()
        }
    }

    override fun onDestroy() {
        meshManager.shutdown()
        super.onDestroy()
    }
}
