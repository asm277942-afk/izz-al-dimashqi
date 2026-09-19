import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const DEMO_MODE = true;
const UNLOCK_CODE = "112008"; // تقدر تغيّر الكود ده لأي كلمة سر تعجبك

function DemoLock({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === UNLOCK_CODE) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "30px",
        background: "#120808",
        color: "#fff",
        direction: "rtl",
      }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        <div style={{ fontSize: "55px", marginBottom: "20px" }}>🔒</div>

        <h1 style={{ marginBottom: "15px" }}>
          هذا الموقع نموذج تجريبي
        </h1>

        <p style={{ lineHeight: "2", color: "#ddd", marginBottom: "25px" }}>
          انتهى وقت المعاينة المخصص لهذا الموقع.
          <br />
          لإلغاء القفل وتشغيل النسخة الكاملة، يرجى إدخال كود التفعيل.
        </p>

        <form onSubmit={handleUnlockSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="password"
            placeholder="أدخل كود التفعيل"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: error ? "2px solid #ff4d4d" : "1px solid #444",
              background: "#1e1111",
              color: "#fff",
              fontSize: "16px",
              textAlign: "center",
              outline: "none",
            }}
          />
          {error && (
            <span style={{ color: "#ff4d4d", fontSize: "14px" }}>
              الكود غير صحيح، حاول مرة أخرى.
            </span>
          )}
          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#e50914",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            فتح الموقع
          </button>
        </form>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {DEMO_MODE && !isUnlocked ? (
            <DemoLock onUnlock={() => setIsUnlocked(true)} />
          ) : (
            <Router />
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
