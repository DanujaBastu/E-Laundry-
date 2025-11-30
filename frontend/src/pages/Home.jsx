import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion"; 

function Home() {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${searchId}`);
      setResult(response.data);
    } catch (err) {
      setError("Order ID tidak ditemukan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div style={styles.container}>

        <div style={styles.navbar}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontWeight: 'bold', color: '#333', fontSize: '24px' }}>
              🧺 E-Laundry
            </span>
            
            <motion.a 
              href="https://wa.me/62812345678"
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.05, color: "#25D366" }} 
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginTop: '5px', cursor: 'pointer', color: '#555', fontSize: '14px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#25D366" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              CP: 0812-3456-78 (Pujo)
            </motion.a>
          </div>

          <motion.button 
            onClick={() => navigate('/login')} 
            style={styles.navButton}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}   
          >
            Login Admin
          </motion.button>
        </div>

        <div style={styles.contentWrapper}>
          <div style={styles.card}>
            <h1>Lacak🧺Laundry</h1>
            
            <form onSubmit={handleSearch} style={styles.form}>
              <input type="text" placeholder="Contoh: LND-001" value={searchId} onChange={(e) => setSearchId(e.target.value)} style={styles.input} />
              
              <motion.button 
                type="submit" 
                style={styles.button} 
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? "..." : "Cek"}
              </motion.button>
            </form>

            {error && <p style={styles.error}>{error}</p>}

            {result && (
              <div style={styles.resultBox}>
                <h3>{result.customerName}</h3>
                <div style={{...styles.statusBadge, backgroundColor: result.status === 'Selesai' ? '#d4eddaff' : '#fff3cd', color: result.status === 'Selesai' ? '#155724' : '#856404'}}>{result.status}</div>
                {result.proofImage && <img src={`http://localhost:5000/uploads/${result.proofImage}`} style={styles.image} alt="Bukti" />}
                <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Rp {result.price.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
        <div style={styles.footer}>&copy; 2025 Lacak Laundry System</div>
      </div>
    </AnimatedPage>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "Arial" },
  navbar: { display: "flex", justifyContent: "space-between", padding: "15px", background: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  navButton: { padding: "8px", border: "1px solid #333", background: "transparent", borderRadius: "5px", cursor: "pointer" },
  contentWrapper: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" },
  card: { background: "rgba(249, 148, 178, 0.64)", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", maxWidth: "400px", width: "100%", textAlign: "center" },
  form: { display: "flex", gap: "10px", margin: "20px 0" },
  input: { flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px 20px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red", background: "#ffe6e6", padding: "10px", borderRadius: "5px" },
  resultBox: { marginTop: "20px", padding: "15px", background: "#ffffff90", borderRadius: "10px" },
  statusBadge: { padding: "10px", borderRadius: "8px", fontWeight: "bold", margin: "10px 0" },
  image: { width: "100%", borderRadius: "8px", marginTop: "10px" },
  footer: { textAlign: "center", padding: "15px", fontSize: "12px", color: "#888" }
};

export default Home;