"use client";

import { motion } from "motion/react";

interface Article {
  id: string;
  title: string;
  url: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "How Home Swapping is Redefining Travel",
    url: "https://www.citylondonnews.co.uk/news/20251113/87037/from-the-holiday-to-social-media-how-home-swapping-is-redefining-travel",
  },
  {
    id: "2",
    title: "Convergence: The lines are getting blurred",
    url: "https://www.linkedin.com/pulse/convergence-lines-getting-blurred-olakunle-alabi-k8nle",
  },
  {
    id: "3",
    title:
      "Designing for edge cases: Situations you didn't think users will be in",
    url: "https://medium.com/@The_Olakunle/designing-for-sweat-cases-situations-you-didnt-think-your-users-will-be-in-515fcfdf8c79",
  },
  {
    id: "4",
    title: "Building a MacOS app as a Designer",
    url: "https://medium.com/@The_Olakunle/building-a-macos-app-as-a-designer-02753f042824",
  },
  {
    id: "5",
    title: "Endowment effect",
    url: "https://medium.com/@The_Olakunle/endowment-effect-the-rental-bike-analogy-b1b64d382b45",
  },
];

export default function Articles() {
  return (
    <section className="articles-section">
      <div className="articles-container">
        <motion.h2
          className="articles-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Mentioned In & Past writing
        </motion.h2>

        <div className="articles-list">
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="article-title">{article.title}</span>
              <div className="article-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
