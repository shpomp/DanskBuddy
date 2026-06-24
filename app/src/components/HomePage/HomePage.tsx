import { Link } from "react-router-dom";

import mark from "../../assets/icon/mark.svg";
import wordmark from "../../assets/wordmark/wordmark.svg";

const benefits: string[] = [
  "Practice Danish conversations",
  "Find language partners",
  "Join a supportive community",
];

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-6 text-foreground">
      <section className="flex min-h-[720px] w-full max-w-[390px] flex-col items-center rounded-[36px] border border-[#efe8dd] bg-[#fffdf9] px-8 py-12 text-center shadow-elevated sm:min-h-[760px] sm:px-9">
        <img
          src={mark}
          alt=""
          className="h-16 w-16 drop-shadow-[0_18px_24px_rgba(230,57,70,0.2)]"
          aria-hidden="true"
        />

        <img
          src={wordmark}
          alt="DanskBuddy"
          className="mt-6 h-auto w-52"
        />

        <p className="mt-3 max-w-xs text-sm font-bold leading-6 text-neutral sm:text-base">
          Hej! Klar til at øve dansk?
        </p>

        <div className="relative mt-8 h-[75px] w-[170px]">
          <div className="absolute bottom-0 left-0 flex h-[52px] w-[52px] items-center justify-center rounded-pill bg-[#e8836b] text-base font-extrabold text-white">
            LE
          </div>
          <div className="absolute bottom-[7px] left-[56px] flex h-[58px] w-[58px] items-center justify-center rounded-pill bg-[#e07a5f] text-lg font-extrabold text-white">
            SO
          </div>
          <div className="absolute bottom-0 right-0 flex h-[52px] w-[52px] items-center justify-center rounded-pill bg-[#5b8def] text-base font-extrabold text-white">
            MI
          </div>
          <div className="absolute left-[101px] top-0 flex h-7 items-center rounded-[11px_11px_11px_3px] bg-foreground px-3 text-sm font-extrabold leading-none text-white">
            <span className="relative z-10 flex items-center gap-1">
              Hej! <span aria-hidden="true">👋</span>
            </span>
            
          </div>
        </div>

        <div className="mt-9 flex w-full flex-col gap-3.5">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 text-left text-sm font-semibold text-neutral"
            >
              <span className="flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-pill bg-secondary text-[12px] font-bold leading-none text-white">
                ✓
              </span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
          <Link
            to="/register"
            className="rounded-pill bg-primary px-7 py-4 text-center font-bold text-white shadow-primary transition hover:bg-primary-dark"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-pill border border-surface bg-white px-7 py-4 text-center font-bold text-foreground shadow-card transition hover:bg-surface-alt"
          >
            Login
          </Link>
        </div>

        <p className="mt-4 text-sm text-neutral">Free to join</p>

        <section className="hidden" aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="sr-only">
            Why DanskBuddy?
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit}
                className="rounded-card bg-white p-6 text-left shadow-card"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-pill bg-secondary-light text-lg font-bold text-secondary-dark">
                  ✓
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {benefit}
                </h3>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default HomePage;
