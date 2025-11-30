import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { username, password });
      localStorage.setItem("token", response.data.token);
      alert("Login Berhasil! 🔓");
      navigate("/admin");
    } catch (error) {
      alert("Login Gagal! Username/Password salah.");
    }
  };

  return (
    <AnimatedPage>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>🔐 Login Admin</h2>
          <p>Masuk untuk mengelola laundry</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Username</label>
              <input type="text" placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label>Password</label>
              <input type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
            </div>

            <motion.button 
                type="submit" 
                style={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Masuk
            </motion.button>
          </form>

          <motion.button 
            onClick={() => navigate('/Home')} 
            style={styles.backBtn}
            whileHover={{ scale: 1.1, color: "#0040ffff" }}
            whileTap={{ scale: 0.9 }}
          >
            &larr; Kembali ke Home
          </motion.button>
        </div>
      </div>
    </AnimatedPage>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f0f5ff" },
  card: { backgroundColor: "#9ecefbca", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.56)", width: "100%", maxWidth: "350px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },
  inputGroup: { textAlign: "left" },
  input: { width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #8e8e8eff", boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.29)", fontSize: "14px", outline: "none" },
  button: { padding: "10px", backgroundColor: "#0040ffff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" },
  backBtn: { marginTop: "20px", background: "none", border: "none", color: "#000000ff", cursor: "pointer" }
};

export default Login;