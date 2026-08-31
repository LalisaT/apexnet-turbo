package com.apexnet.turbo.mesh

import android.content.Context
import android.net.wifi.p2p.WifiP2pConfig
import android.net.wifi.p2p.WifiP2pDevice
import android.net.wifi.p2p.WifiP2pManager
import android.util.Log
import java.io.InputStream
import java.io.OutputStream
import java.net.InetSocketAddress
import java.net.ServerSocket
import java.net.Socket

/**
 * MeshDirectManager - Off-Grid Decentralized Peer-to-Peer Packet Relay
 * Communicates directly between devices via Wi-Fi Direct and Sockets without Cell Towers
 */
class MeshDirectManager(private val context: Context) {

    private val p2pManager = context.getSystemService(Context.WIFI_P2P_SERVICE) as? WifiP2pManager
    private val channel = p2pManager?.initialize(context, context.mainLooper, null)

    private val discoveredPeers = mutableListOf<WifiP2pDevice>()
    private var serverSocket: ServerSocket? = null
    private var isListening = false

    companion object {
        const val MESH_PORT = 8988
        const val TAG = "ApexMeshDirect"
    }

    interface MeshDataListener {
        fun onPeerDiscovered(peers: List<WifiP2pDevice>)
        fun onPacketReceived(packetData: String, senderAddress: String)
    }

    var listener: MeshDataListener? = null

    fun startPeerDiscovery() {
        p2pManager?.discoverPeers(channel, object : WifiP2pManager.ActionListener {
            override fun onSuccess() {
                Log.d(TAG, "Off-Grid Wi-Fi Direct Peer Discovery Started.")
            }

            override fun onFailure(reasonCode: Int) {
                Log.e(TAG, "Discovery Failed with code: $reasonCode")
            }
        })
    }

    fun startMeshRelayServer() {
        if (isListening) return
        isListening = true

        Thread {
            try {
                serverSocket = ServerSocket(MESH_PORT)
                Log.d(TAG, "Mesh Relay Server listening on port $MESH_PORT")

                while (isListening) {
                    val client = serverSocket?.accept() ?: break
                    Thread {
                        handleClientConnection(client)
                    }.start()
                }
            } catch (e: Exception) {
                Log.e(TAG, "Mesh server error", e)
            }
        }.start()
    }

    private fun handleClientConnection(socket: Socket) {
        try {
            val input: InputStream = socket.getInputStream()
            val buffer = ByteArray(4096)
            val bytesRead = input.read(buffer)
            if (bytesRead > 0) {
                val message = String(buffer, 0, bytesRead)
                val sender = socket.inetAddress.hostAddress ?: "Unknown"
                Log.i(TAG, "Off-Grid Packet Received from $sender: $message")
                listener?.onPacketReceived(message, sender)
            }
            socket.close()
        } catch (e: Exception) {
            Log.e(TAG, "Client socket error", e)
        }
    }

    fun sendPacketToPeer(peerAddress: String, packet: String) {
        Thread {
            try {
                val socket = Socket()
                socket.connect(InetSocketAddress(peerAddress, MESH_PORT), 3000)
                val output: OutputStream = socket.getOutputStream()
                output.write(packet.toByteArray())
                output.flush()
                socket.close()
                Log.i(TAG, "Packet successfully transmitted off-grid to $peerAddress")
            } catch (e: Exception) {
                Log.e(TAG, "Failed to transmit packet to $peerAddress", e)
            }
        }.start()
    }

    fun shutdown() {
        isListening = false
        try {
            serverSocket?.close()
        } catch (e: Exception) {
            Log.e(TAG, "Error closing mesh server", e)
        }
    }
}
