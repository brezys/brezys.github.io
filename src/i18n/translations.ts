export const translations = {
  en: {
    greeting: "Hi, I'm Nick",
    description: "Computer Science student graduating in {days} days. Passionate about building cool solutions to interesting problems.",
    skills: "Skills",
    frontend: "Frontend Development",
    backend: "Backend Development",
    databases: "Databases",
    machineLearning: "Machine Learning",
    japanese: "Japanese",
    projects: "Projects",
    featuredProjects: "Featured Projects",
    featuredDescription: "Highlighted projects that showcase my best work",
    otherProjects: "Other Projects",
    otherDescription: "Additional projects I've worked on",
    education: "Education",
    experience: "Experience",
    connect: "Let's Connect",
    lookingFor: "I'm currently looking for new opportunities",
    getInTouch: "Get in Touch",
    degree: "Bachelor of Science in Computer Science",
    university: "University of North Carolina at Charlotte",
    graduation: "Expected Graduation: May 2025",
    coursework: "Relevant Coursework:",
    courses: [
      "Data Structures and Algorithms",
      "Database Design and Implementation",
      "Database Management Systems",
      "Software Engineering Projects",
      "Machine Learning and Artificial Intelligence"
    ],
    viewResume: "View Resume",
    nlevel: "JLPT N2 (In Progress)"
  },
  ja: {
    greeting: "ニックです",
    description: "あと{days}日で卒業予定のコンピュータサイエンス専攻の学生です。面白い問題に対してクールなソリューションを作ることに情熱を持っています。",
    skills: "スキル",
    frontend: "フロントエンド開発",
    backend: "バックエンド開発",
    databases: "データベース",
    machineLearning: "機械学習",
    japanese: "日本語",
    projects: "プロジェクト",
    featuredProjects: "注目プロジェクト",
    featuredDescription: "私の最高の作品を紹介するプロジェクト",
    otherProjects: "その他のプロジェクト",
    otherDescription: "これまでに取り組んだプロジェクト",
    education: "学歴",
    experience: "職歴",
    connect: "お問い合わせ",
    lookingFor: "現在、新しい機会を探しています",
    getInTouch: "連絡する",
    degree: "コンピュータサイエンス学士",
    university: "ノースカロライナ大学シャーロット校",
    graduation: "卒業予定：2025年5月",
    coursework: "関連科目：",
    courses: [
      "データ構造とアルゴリズム",
      "データベース設計と実装",
      "データベース管理システム",
      "ソフトウェアエンジニアリングプロジェクト",
      "機械学習と人工知能"
    ],
    viewResume: "履歴書を見る",
    nlevel: "JLPT N2 (進行中)"
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;