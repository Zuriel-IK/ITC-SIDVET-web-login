import { type SubmitEvent, useRef, useState } from "react";
import type { LoginResponse } from "./types/auth";
import { authService } from "./services/auth.service";
import logoTecnm from "./assets/tecnmlogo.png";
import logoITC from "./assets/itcuautla.png";
import { UserIcon, type UserIconHandle } from "@/components/ui/user"
import { KeyCircleIcon, type KeyIconHandle } from "./components/ui/key-circle";
import { EyeOffIcon } from "./components/ui/eye-off";
import { EyeIcon } from "lucide-react";
import { LogInIcon, type LogInIconHandle } from "./components/ui/login";

const App = () => {
  const [numberOrEmail, setNumberOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef<LogInIconHandle>(null);
  const userRef = useRef<UserIconHandle>(null);
  const keyCircleRef = useRef<KeyIconHandle>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typePass, setTypePass] = useState("password")
  const handleViewPass = () => {
    setTypePass((currentType) =>
      currentType === "password" ? "text" : "password"
    );
  };
  const handleSubmit = async ( event: SubmitEvent<HTMLFormElement> ) => {
    event.preventDefault();

    if (!numberOrEmail.trim() || !password) {
      setError("Ingresa tu número de control o correo y tu contraseña");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response: LoginResponse = await authService.login({
          numberOrEmail,
          password
        });
      sessionStorage.setItem(
        "csrfToken",
        response.csrfToken
      );

      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(response.user)
      );
      if (response.redirectTo === "/admin") {
        window.location.assign("http://localhost:5174");
      } else if (response.redirectTo === "/student") {
        window.location.assign("http://localhost:5175");
      } 
      // window.location.assign(response.redirectTo);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-(--steel-200)">
      <form className="flex h-min w-min flex-col items-center justify-start rounded-lg bg-(--steel-100) p-12 gap-6 border border-(--steel-300)" onSubmit={handleSubmit}>
        <section className="flex w-full h-min items-center justify-center gap-12">
          <div className="flex size-22 items-center justify-center">
            <img src={logoTecnm} className="size-full object-contain" alt="" />
          </div>
          <span className="h-18 w-px bg-(--steel-300)"></span>
          <div className="flex size-22 items-center justify-center">
            <img src={logoITC} className="size-full object-contain" alt="" />
          </div>
        </section>
        <span className="h-px w-80 bg-(--steel-300)"></span>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-6xl font-semibold">SIDVET</h1>
          <p className="w-60 text-center text-xs">Sistema Integral de Desarrollo, Vinculación y Enlace Tecnológico</p>
        </div>
        <span className="h-px w-80 bg-(--steel-300)"></span>
        <label className="flex flex-col items-start justify-center w-80 h-min gap-2">
          <span className="text-xs font-medium text-(--steel-600)">
            Número de control o correo
          </span>
          <div 
            className="relative w-full"
            onMouseEnter={() => userRef.current?.startAnimation()}
            onMouseLeave={() => userRef.current?.stopAnimation()}
          >
            <UserIcon
              ref={userRef}
              size={20}
              className=" absolute top-1/2 left-3 -translate-y-1/2 text-(--steel-600)"
            />
            <input
              type="text"
              autoComplete="username"
              value={numberOrEmail}
              onChange={(event) => {
                setNumberOrEmail(event.target.value);
              }}
              disabled={isSubmitting}
              placeholder="22150001 o su@correo.com"
              className="w-full rounded-sm border border-(--steel-300) py-3 pr-4 pl-11 outline-none transition bg-(--steel-200) focus:border-blue-700 text-xs"
            />
          </div>
        </label>

        <label className="flex flex-col items-start justify-center w-80 h-min gap-2">
          <span className="text-xs font-medium text-(--steel-600)">
            Contraseña
          </span>
          <div 
            className="relative w-full" 
            onMouseEnter={() => keyCircleRef.current?.startAnimation()}
            onMouseLeave={() => keyCircleRef.current?.stopAnimation()}
          >
            <KeyCircleIcon
              ref={keyCircleRef}
              aria-hidden="true"
              size={20}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-(--steel-600)"
            />

            <input
              type={typePass}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
              placeholder="••••••••"
              className="w-full rounded-sm border border-(--steel-300) bg-(--steel-200) py-3 pr-11 pl-11 text-xs outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              type="button"
              onClick={handleViewPass}
              disabled={isSubmitting}
              aria-label={
                typePass === "password" ? "Mostrar contraseña" : "Ocultar contraseña"
              }
              className="absolute cursor-pointer top-1/2 right-3 flex -translate-y-1/2 items-center justify-center text-(--steel-600) transition-colors hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {typePass === "password" ? (
                <EyeIcon aria-hidden="true" size={20} />
              ) : (
                <EyeOffIcon aria-hidden="true" size={20} />
              )}
            </button>
          </div>
        </label>

        {error && (
          <p
            className="rounded-md bg-red-50 p-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-80 items-center justify-center gap-2 rounded-sm bg-(--main-color) px-4 py-2 text-sm font-medium text-(--steel-100) transition disabled:cursor-not-allowed cursor-pointer disabled:opacity-60"
          onMouseEnter={() => loginRef.current?.startAnimation()}
          onMouseLeave={() => loginRef.current?.stopAnimation()}
        >
          <LogInIcon
            ref={loginRef}
            aria-hidden="true"
            size={20}
            className="shrink-0 text-(--steel-100)"
          />

          <span>
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </span>
        </button>
      </form>
    </main>
  );
}

export default App
