import { Link } from "react-router-dom";

type Benefit = {
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    title: "Practice Danish conversations",
    description: "Build confidence through real conversations in Danish.",
  },
  {
    title: "Find language partners",
    description:
      "Meet people with similar goals, interests, and language levels.",
  },
  {
    title: "Join a supportive community",
    description:
      "Stay motivated while learning together with other Danish learners.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section>
        <p>Learn Danish together</p>

        <h1>DanskBuddy</h1>

        <p>
          Find language partners, practise real conversations, and become more
          confident speaking Danish.
        </p>

        <div>
          <Link to="/register">Get Started</Link>
          <Link to="/login">Login</Link>
        </div>
      </section>

      <section>
        <h2>Why DanskBuddy?</h2>

        <div>
          {benefits.map((benefit) => (
            <article key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
