export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1>👗 Bem-vindo à Joyfashion!</h1>
      <p>O seu novo espaço de moda e estilo.</p>
      <a
        href="/auth/login"
        style={{
          marginTop: '20px',
          background: '#000',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none'
        }}
      >
        Entrar / Registrar
      </a>
    </div>
  );
}
