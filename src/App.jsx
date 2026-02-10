import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";
import './App.css';

function App() {
  return (
    <>
      <Toaster
        position="top-right"         
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          marginTop: '70px',           
        }}
        toastOptions={{
          duration: 4000,         
          style: {
            padding: '16px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '500',
            maxWidth: '450px',
            background: '#1f2937',  
            color: '#f3f4f6',
            border: '1px solid #374151',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
            zIndex: 999999,
          },
          success: {
            style: {
              background: '#065f46',
              border: '1px solid #10b981',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              background: '#7f1d1d',
              border: '1px solid #ef4444',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <AllRoutes />
    </>
  );
}

export default App;
