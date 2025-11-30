import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion"; 

const PRICE_LIST = {
  "Cuci Komplit": 6500,
  "Cuci Kering": 5000,
  "Satuan": 1000
};

function Admin() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);

  const [formData, setFormData] = useState({
    orderId: "", customerName: "", serviceType: "Cuci Komplit", weight: "", price: 0
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) { console.error("Gagal ambil data"); }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); } else { fetchOrders(); }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    if (name === "weight" || name === "serviceType") {
      const berat = name === "weight" ? parseFloat(value) : parseFloat(formData.weight);
      const layanan = name === "serviceType" ? value : formData.serviceType;
      const hargaPerKg = PRICE_LIST[layanan] || 0;
      if (!isNaN(berat) && berat > 0) { newFormData.price = berat * hargaPerKg; } else { newFormData.price = 0; }
    }
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/orders", formData);
      alert("✅ Order berhasil ditambahkan!");
      setFormData({ orderId: "", customerName: "", serviceType: "Cuci Komplit", weight: "", price: 0 });
      fetchOrders();
    } catch (error) { alert("❌ Gagal simpan."); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus data ini?")) {
      try { await axios.delete(`http://localhost:5000/api/orders/${id}`); fetchOrders(); } 
      catch (error) { alert("Gagal hapus data"); }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try { await axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus }); fetchOrders(); } 
    catch (error) { alert("Gagal update status"); }
  };

  const handleUploadBukti = async (id) => {
    if (!selectedFile) return alert("Pilih foto dulu!");
    const formDataUpload = new FormData();
    formDataUpload.append("status", "Selesai");
    formDataUpload.append("image", selectedFile);
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, formDataUpload, { headers: { "Content-Type": "multipart/form-data" } });
      alert("📸 Bukti berhasil diupload!");
      setSelectedFile(null); setUploadingId(null); fetchOrders();
    } catch (error) { alert("Gagal upload gambar"); }
  };

  const handleLogout = () => { localStorage.removeItem("token"); navigate('/login'); };

  return (
    <AnimatedPage>
      <div style={styles.pageContainer}>
        <div style={styles.header}>
          <h2>🔧 Dashboard Admin</h2>

          <motion.button 
            onClick={handleLogout} 
            style={styles.logoutBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Keluar
          </motion.button>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <h3 style={{ marginBottom: '15px' }}>➕ Buat Order Baru</h3>
            <form onSubmit={handleSubmit} style={styles.formGrid}>
              <div style={styles.inputGroup}><label>ID Order</label><input name="orderId" placeholder="LND-00X" value={formData.orderId} onChange={handleChange} style={styles.input} required /></div>
              <div style={styles.inputGroup}><label>Nama Pelanggan</label><input name="customerName" placeholder="Nama..." value={formData.customerName} onChange={handleChange} style={styles.input} required /></div>
              <div style={styles.inputGroup}>
                <label>Layanan</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} style={styles.input}>
                  <option value="Cuci Komplit">Cuci Komplit (6.500/kg)</option>
                  <option value="Cuci Kering">Cuci Kering (5.000/kg)</option>
                  <option value="Satuan">Satuan (1.000/kg)</option>
                </select>
              </div>
              <div style={styles.inputGroup}><label>Berat (Kg)</label><input type="number" name="weight" placeholder="0" value={formData.weight} onChange={handleChange} style={styles.input} required step="0.1" /></div>
              <div style={styles.inputGroup}><label>Total Harga</label><input type="text" name="price" value={`Rp ${formData.price.toLocaleString()}`} readOnly style={{...styles.input, backgroundColor: '#e9ecef', fontWeight: 'bold', color: '#333'}} /></div>
              
              <div style={styles.inputGroup}>
                <label>&nbsp;</label> 
                <motion.button 
                    type="submit" 
                    style={styles.submitBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Simpan
                </motion.button>
              </div>
            </form>
          </div>

          <div style={styles.card}>
            <h3 style={{ marginBottom: '15px' }}>📋 Daftar Antrian</h3>
            {loading ? <p>Loading data...</p> : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                      <th style={styles.th}>ID</th><th style={styles.th}>Nama</th><th style={styles.th}>Layanan</th><th style={styles.th}>Berat</th><th style={styles.th}>Status</th><th style={styles.th}>Bukti Foto</th><th style={styles.th}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={styles.td}>{order.orderId}</td>
                        <td style={styles.td}>{order.customerName}</td>
                        <td style={styles.td}>{order.serviceType}</td>
                        <td style={styles.td}>{order.weight} kg</td>
                        <td style={styles.td}>
                          <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} style={{...styles.statusSelect, backgroundColor: order.status === 'Selesai' ? '#d1e7dd' : order.status === 'Dicuci' ? '#cce5ff' : '#fff3cd', color: order.status === 'Selesai' ? '#0f5132' : order.status === 'Dicuci' ? '#004085' : '#856404'}}>
                            <option value="Pending">Pending</option><option value="Dicuci">Dicuci</option><option value="Selesai">Selesai</option>
                          </select>
                        </td>
                        <td style={styles.td}>
                          {order.proofImage ? (
                            <a href={`http://localhost:5000/uploads/${order.proofImage}`} target="_blank" rel="noreferrer" style={styles.linkBukti}>📸 Lihat</a>
                          ) : (
                            order.status === 'Selesai' ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <input type="file" style={{ fontSize: '10px' }} onChange={(e) => { setSelectedFile(e.target.files[0]); setUploadingId(order._id); }} />
                                {uploadingId === order._id && selectedFile && (
                                  
                                  <motion.button 
                                    onClick={() => handleUploadBukti(order._id)} 
                                    style={styles.uploadBtn}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    ⬆ Upload
                                  </motion.button>
                                )}
                              </div>
                            ) : <span style={{ color: '#ccc' }}>-</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          
                          <motion.button 
                            onClick={() => handleDelete(order._id)} 
                            style={styles.deleteBtn}
                            whileHover={{ scale: 1.2, rotate: 10 }} 
                            whileTap={{ scale: 0.8 }}
                          >
                            ❌
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

const styles = {
  pageContainer: { minHeight: "100vh", backgroundColor: "#f4f6f8", paddingBottom: "50px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { backgroundColor: "#fb97e4ff", color: "#404040ff", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  logoutBtn: { backgroundColor: "#ff0000ff", border: "1px solid #9e9999", color: "#ffffffff", padding: "5px 15px", borderRadius: "4px", cursor: "pointer" },
  content: { maxWidth: "1000px", margin: "30px auto", padding: "0 20px" },
  card: { backgroundColor: "white", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "30px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", alignItems: "end" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px", fontSize: "14px", fontWeight: "bold", color: "#555" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ced4da", fontSize: "14px" },
  submitBtn: { padding: "10px", backgroundColor: "#ff8ac8ff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
  th: { padding: "12px 15px", borderBottom: "2px solid #dee2e6", color: "#495057" },
  td: { padding: "12px 15px", verticalAlign: "middle", color: "#212529", fontSize: "14px" },
  statusSelect: { padding: "6px 10px", borderRadius: "20px", border: "none", fontWeight: "bold", fontSize: "12px", cursor: "pointer" },
  linkBukti: { color: "#007bff", textDecoration: "none", fontWeight: "bold", fontSize: "13px" },
  uploadBtn: { backgroundColor: "#0d6efd", color: "white", border: "none", borderRadius: "3px", padding: "4px 8px", cursor: "pointer", fontSize: "11px", marginTop: "5px" },
  deleteBtn: { backgroundColor: "#dc3545", color: "white", border: "none", padding: "6px 10px", borderRadius: "5px", cursor: "pointer" }
};

export default Admin;