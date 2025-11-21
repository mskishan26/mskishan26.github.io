export const siteConfig = {
  name: "Kishan Sathish Babu",
  title: "Data Scientist",
  description: "Portfolio website of Kishan Sathish",
  accentColor: "#1d4ed8",
  social: {
    email: "mskishan26@gmail.com",
    linkedin: "https://www.linkedin.com/in/kishan-ms/",
    github: "https://github.com/mskishan26",
  },
  aboutMe:
    "Hi, I'm Kishan. I'm a data scientist who loves turning messy, real-world problems into systems that actually make people's jobs easier. I've worked across research labs, hospitals, and engineering teams, so I've gotten good at collaborating, asking the right questions, and building solutions that hold up in the real world. I'm always looking for teams where thoughtful engineering and good communication matter.",
  skills: ["Python", "Neural Nets", "Machine Learning", "SQL", "AWS", "Large Language Models", "Docker", "Tableau", "PowerBI", "Excel"],
  projects: [
    {
      name: "ResuMatrix - Intelligent Resume Scoring System",
      slug: "resumatrix",
      description:
        "The ResuMatrix project is an Intelligent Resume Screening System designed to solve a core business problem: quickly prioritizing high-probability job applicants. Uses LLMs to score resumes based on job requirements and returns the top candidates.",
      longDescription:
        `

### 🎯 Business Challenge  

Today's tech job postings attract a high volume of talented professionals, often **overwhelming recruiting HR teams**. Furthermore, the technical complexity of modern roles makes it difficult for recruiters to **validate a profile's freshness and alignment** with the specific job description through manual review alone.

* **Goal:** Improve the **Click-Through Rate (CTR)** for manually reviewed resumes. If, for instance, only 3 out of 10 currently reviewed resumes are valid for follow-up, Résumatrix aims to significantly increase that ratio.


### 💡 Proposed Solution: Résumatrix

We propose **Résumatrix**, an intelligent, multi-stage resume scoring tool designed to bring immediate efficiency and precision to the screening process.

Résumatrix operates by:
1.  **Structural Parsing:** Splitting candidate profiles into specific, measurable sections (e.g., Education, Work Experience, Projects, Certifications, Publications).
2.  **Sectional Scoring:** Generating a separate quality score for each section.
3.  **Weighted Aggregation:** Combining these sectional scores using a **recruiter-defined weighted formula**, allowing HR to customize ranking based on the job's priority (e.g., weighting Experience higher for senior roles).

This methodology allows recruiters to **rank and prioritize** resumes before investing time in a manual review, ensuring they focus on the most relevant candidates first.

---

### ⚙️ Technical Architecture

Résumatrix relies on a robust **three-stage machine learning and ranking architecture** to progressively filter and refine the candidate pool:

1.  **Stage 1: Rule-Based Filter** 
    * **Purpose:** To eliminate candidates who do not meet mandatory, non-negotiable criteria.
    * **Mechanism:** Based on **deterministic questions** and simple criteria defined by the HR team (e.g., minimum experience, required certifications).

2.  **Stage 2: Relevance Classification (XGBoost on BERT Embeddings)**
    * **Purpose:** To filter candidates who pass the initial rules but lack deeper relevance to the role.
    * **Mechanism:** A **single BERT embedding** is generated per resume, capturing the full semantic content. This is passed to a custom **XGBoost model** trained to classify the resume's fit against the target job description.

3.  **Stage 3: Sectional Ranking and Aggregation (Borda Rank)**
    * **Purpose:** To provide a highly granular and defensible final ranking.
    * **Mechanism:** The resume is split into its various sections. A **separate rank** for each section is calculated (e.g., Rank of Education, Rank of Experience). These ranks are then combined using **Borda rank aggregation**, which is highly effective in preventing score ties and ensuring meaningful differentiation between candidates.

---

### 🚀 Why Résumatrix Excels (The Borda Rank Advantage)

The core innovation of Résumatrix lies in its **Stage 3 sectional ranking**. By classifying and combining **ranks** (using Borda Count) rather than just aggregating raw scores, we mitigate the issue of "close aggregations". This guarantees a more distinct and accurate ordering of candidates, preventing multiple high-quality resumes from being grouped together with the same final score, which often leads to slightly poor results in simple scoring systems.

---

### 💻 Implementation Stack

The system was built using a modern, scalable technical stack:

* **Frontend/Backend:** **FastAPI** was used for the robust backend service, connected to a **Streamlit** application for the recruiter-facing user interface.
* **Data Processing:** **Gemini LLMs** were utilized to reliably parse raw resumes into a structured, machine-readable format.
* **MLOps:** **Airflow** was configured locally for managing automated workflows, including embedding generation.
* **Data Management:** **GCP** (Google Cloud Platform) services were used for data storage and management, handling resume uploads and processing artifacts.`,
      link: "https://github.com/ResuMatrix/ResuMatrix",
      git_link: "https://github.com/ResuMatrix/ResuMatrix",
      skills: ["Python", "Airflow", "LLMs", "SQL", "Streamlit", "FastAPI"],
      images: [],
    },
    {
      name: "Earthscape: Surficial Geology Mapping from Multimodal Data",
      slug: "earthscape",
      description:
        "Experimented with custom deep CNNs to classify the soil types of land patches for geological planning and disaster mitigation.",
      longDescription:
        `
### 🎯 Business Challenge

Surficial geology mapping—the process of creating maps that show the composition of unconsolidated materials on the Earth's surface—historically requires **extensive, time-consuming fieldwork** performed by expert geologists. The goal of this project was to leverage machine learning to automate and scale this process, transforming a field-intensive task into an efficient, data-driven system.

* **Data Scope:** The project utilized a massive dataset of **30,000 samples** delivered across **34 different modalities** (sensors/data types).

---

### 🔬 The Iterative Approach & Key Learnings

We explored three distinct modeling approaches to determine the most effective way to leverage the rich multi-modal data.

#### **Attempt 1: The Baseline (Standard ResNet)**

* **Method:** We used a **standard ResNet** model initialized with the three RGB modalities. We only added a simple layer to the fully-connected (FC) graph to generate an initial prediction.
* **Result:** This provided a necessary **baseline** performance, a starting point against which all subsequent experiments were measured.

#### **Attempt 2: The Custom Model (High-Modality Focus)**

* **Method:** We built a custom model from scratch, featuring **five convolutional (Conv) layers and five FC layers**. Crucially, we increased the input data from 3 modalities to **15 select modalities** from the original 34. We hypothesized that because the image patches of the Earth did not exhibit significant divergence, a simple model structure would suffice.
* **Result:** The model achieved **comparable metrics** to the baseline, but the training failed spectacularly. The model was **not converging**, with the **validation loss fluctuating wildly** while the training loss steadily decreased—a clear case of severe **overfitting**. This taught us that simply adding more, potentially redundant, data modalities doesn't guarantee success; a **targeted approach** was necessary.

#### **Attempt 3: The Breakthrough (Intermediate Merging via Adapter)**

* **Method:** We adopted the **targeted approach**. We carefully split 12 chosen modalities into two meaningful groups based on the sensors that captured them, yielding two distinct sets of data channels (**4 channels and 8 channels**). We then built a **custom adapter** to process these inputs and feed them into the **pre-trained ResNet**.
    * **The Innovation:** Instead of the standard late-stage concatenation of embeddings (concatenating the outputs at the very end), we performed **intermediate merging**. We added a **1x1 convolutional layer** to combine the feature maps from both sensor sets **mid-network**, and then passed this merged output through the final layers of the ResNet.
* **Result:** This novel fusion technique resulted in **incredibly better results** and delivered our much-needed project success.

---

### 🧠 The Takeaway: Customization vs. Custom Models

This project was a unique learning experience, as the class was philosophically divided into two camps: one advocating for entirely custom-built models and the other favoring building upon existing, established architectures (like ResNet).

My initial approach favored the established architecture, and the project reinforced that perspective:

* **Custom Models (Attempt 2) vs. Customization (Attempt 3):** Attempt 2, the custom model, was a failure because it had to learn all features from scratch, leading to overfitting and instability. The winning approach (Attempt 3) succeeded by **strategically customizing** the established ResNet architecture.
* **The Win:** The "victory" here wasn't just in the final metric, but in demonstrating that true innovation often lies not in reinventing the entire wheel, but in building smart **adapters and novel fusion techniques** to integrate new data streams into proven, robust architectures. This blend of leveraging powerful transfer learning (ResNet) while engineering a custom **intermediate merging adapter** proved far superior to building a simple custom model from scratch.

This outcome solidified my understanding that in deep learning, **thoughtful customization of proven models often yields better, more reliable, and more resource-efficient results** than a full bespoke build, especially when dealing with complex data and limited training time.`,
      link: "https://fullstackextensions.com/?ref=devportfolio",
      skills: ["Convolutional Neural Networks", "PyTorch", "AWS", "ResNet"],
      images: ['/images/custom_resnet.png'],
    },
    {
      name: "Atlas Rentals",
      slug: "atlas-rentals",
      description:
        "Developed a full-stack, API-integrated property rental platform using Node.js and MongoDB that automated listing discovery, optimized agent-client scheduling, and featured custom filters to match student renters with university-proximate housing.",
      longDescription:
        `I engineered a full-stack property rental application leveraging Node.js for the backend architecture and MongoDB for scalable data persistence. The platform was built around the integration of several background APIs to automate key leasing workflows. Specifically, I integrated SignNow for secure, digital lease signing and implemented calendar integrations to automatically optimize property showing schedules between agents and prospective tenants.

To ensure comprehensive inventory, I utilized the YouGotListings API to efficiently crawl thousands of property listings directly onto the website portal. A core feature developed was a system of custom geographical and demographic filters designed to intelligently match student renters with available housing based on their proximity requirements to Boston-area universities. Although the final, proprietary codebase was developed in collaboration with a Boston-based realtor, a previous iteration of the application is available for review.`,
      link: "https://rentalsiteapp.vercel.app/",
      skills: ["React", "Node.js", "MongoDB", "Database Architecture", "YouGotListings"],
      images: [],
    },
  ],
  experience: [
    {
      company: "Northeastern University - Vitek Lab",
      title: "Graduate Researcher",
      dateRange: "Sept 2025 - Dec 2025",
      bullets: [
        "PDF Processing Pipeline: Engineered an end-to-end PDF processing pipeline using open-source LLMs (Marker and Microsoft Phi 4) to convert hundreds of academic papers into structured markdown, ensuring the preservation of scientific notation and document hierarchy for accurate information retrieval.",
        "Three-Stage RAG Development: Developed a three-stage Retrieval-Augmented Generation (RAG) system following production-grade practices, focusing on sparse search, dense search, and reranking. This used semantic chunking strategies optimized for LLM generation, eliminating external API dependencies.",
        "Resource-Constrained Deployment: Implemented a local, end-to-end system with grounding on a single A100 GPU and employed memory optimization techniques to function effectively with constrained resources.",
        "Multi-Hop Agentic Architecture: The developed system implements a multi-hop agentic architecture to enable iterative, cross-paper information synthesis, specifically designed to answer complex research queries that require information from multiple source documents.",
      ],
    },
    {
      company: "Medidata Solutions Inc",
      title: "Data Engineer Intern",
      dateRange: "May 2025 - Aug 2025",
      bullets: [
        "Forecasting-Driven Chatbot Development: Developed a novel two-stage, forecasting-driven chatbot for resource planning, utilizing time series models (ARIMA, Prophet, TSB) in Python.",
        "Accuracy Improvement: Replaced static user-provided estimates with model forecasts, achieving a 25% improvement in forecast accuracy.",
        "Data Management: Stored the forecast data in DuckDB for weekly, multi-week generation, ensuring lean data loading.",
        "Agentic Visualization: Built an agentic LLM chatbot using LangGraph that could generate interactive graphs using Plotly based on exact user-specified filters and customizations.",
        "Simulation Capability: The agentic agent included an option to simulate workload and time-off patterns, allowing users to push baseline simulations and plan team organization for multiple sprints.",
        "MLOps and Deployment: Deployed a production-grade MLOps pipeline on AWS, utilizing services including SageMaker, Lambda, S3, Redshift, and DynamoDB.",
        "Pipeline Features: The MLOps pipeline provided automated retraining, monitoring, and chat history retention.",
      ],
    },
    {
      company: "Boston Childrens Hospital",
      title: "Data Science Intern",
      dateRange: "Sept 2024 - Dec 2024",
      bullets: [
        "Processed and analyzed intracranial EEG (iEEG) data using signal processing, statistical modeling, and feature extraction techniques in Python and MATLAB to support surgical planning in epilepsy. ",
        "Designed a hybrid ML pipeline transforming extracted features and signals into time-frequency images, processed through a fine-tuned VGGNet and SVM pipeline to localize seizure onset zones—reducing electrodes from 95 to 15 and clinician effort by 80%. ",
      ],
    },
    {
      company: "Ernst & Young LLP",
      title: "Data Scientist",
      dateRange: "Jan 2021- Aug 2023",
      bullets: [
        "Financial Impact & Predictive Modeling: Delivered over $2 Million in verified annual cost savings by building and deploying a suite of predictive models (Linear Regression, Naive Bayes) on complex SAP inventory and demand data. These models were integrated directly into planner-facing UI systems to provide actionable forecasts and decision support, reducing unplanned expenditures.",
        "Real-Time Optimization Engine: Engineered high-throughput, real-time data pipelines (leveraging Kafka for streaming and SQL/Lua for processing) coupled with sophisticated optimization frameworks (Integer Programming and Graph Theory). This system dynamically rebalanced inventory across regional warehouses and streamlined shipment logistics, resulting in a 15% reduction in excess manufacturing and significantly reducing reliance on costly third-party expedited shipping.",
        "Data Warehouse Architecture & Scalability: Designed and maintained a robust Databricks data warehouse architecture, implementing optimized PySpark/SQL ETL pipelines. This system creates reliable, scalable snapshots of high-volume SAP transaction data (up to 1TB daily) for reporting and analysis, complete with automated data integrity and validation checks that guarantee data reliability for downstream business intelligence (BI) consumption.",
        "Workflow Automation and Decision Support: Automated critical planning workflows and developed recommender systems using a diverse toolset (SQL, proprietary APIs, Pandas, R). This intelligent decision support system improved key manufacturing KPIs (e.g., Cycle Time and On-Time Delivery) and eliminated over 20+ hours of manual reporting weekly for planning teams, allowing them to focus on strategic execution rather than data aggregation.",
      ],
      skills: ["Python", "SQL", "ETL", "PowerBI", "Pandas", "R", "Linear Regression", "Databricks"],
    },
  ],
  education: [
    {
      school: "Northeastern University",
      degree: "Master of Science in Data Science",
      dateRange: "2023 - 2025",
      achievements: [
        "Graduated with 3.9 GPA",
        "Coursework: Supervised Machine Learning, MLOps, Unsupervised Machine Learning, Introduction to Data Management, Computer Vision and Pattern Recognition ",
      ],
    },
    {
      school: "PES University",
      degree: "Bachelor of Technology in Electronics Engineering",
      dateRange: "2017 - 2021",
      achievements: [
      ],
    },
  ],
};
