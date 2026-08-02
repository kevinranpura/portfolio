export const projectsData = [
    {
        id: 'resumewiz',
        title: 'ResumeWiz',
        shortDescription: 'AI-powered resume builder that generates ATS-friendly resumes with intelligent content generation, multiple professional templates, and real-time editing.',

        fullDescription: 'ResumeWiz is a full-stack AI-powered resume builder designed to simplify the resume creation process. Users can build professional, ATS-friendly resumes using AI-assisted content generation, customize them with multiple modern templates, edit every section in real time, and export polished resumes as PDFs. The application combines an intuitive user experience with modern web technologies to help users create high-quality resumes quickly and efficiently.',

        tags: [
            'React',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Firebase',
            'Tailwind CSS',
            'Groq API'
        ],

        features: [
            'AI-powered resume content generation using LLMs',
            'Multiple ATS-friendly resume templates',
            'Real-time resume editing and live preview',
            'Secure user authentication with Firebase',
            'PDF export with professional formatting',
            'Responsive and modern user interface',
            'Customizable resume sections and layouts'
        ],

        challenges: [
            'Generating context-aware and professionally written resume content using AI',
            'Maintaining consistent formatting across multiple resume templates',
            'Synchronizing real-time edits with the live preview',
            'Generating high-quality PDF exports while preserving layout consistency'
        ],

        solutions: [
            'Integrated Groq LLM APIs for intelligent resume content generation',
            'Built reusable template components for consistent resume layouts',
            'Implemented centralized state management for seamless live updates',
            'Optimized PDF generation to produce clean and ATS-friendly resumes'
        ],

        github: 'https://github.com/kevinranpura/ai-resume-builder',
        live: 'https://ai-resume-builder-kevins-projects-1bc07b22.vercel.app/',
        featured: true
    },
    {
        id: 'document-ai-assistant',
        title: 'Document AI Assistant',

        shortDescription: 'RAG-powered AI assistant that allows users to upload PDF documents, perform semantic search, and receive context-aware answers with source citations.',

        fullDescription: 'Document AI Assistant is a Retrieval-Augmented Generation (RAG) application that enables users to upload PDF documents and interact with them using natural language. The application extracts document content, generates vector embeddings, stores them in a vector database, retrieves the most relevant context using semantic search, and leverages an LLM to generate accurate, context-aware responses with source references. Built with a React frontend and FastAPI backend, the project demonstrates an end-to-end RAG pipeline for document question answering.',

        tags: [
            'React',
            'FastAPI',
            'Python',
            'LangChain',
            'ChromaDB',
            'Groq API',
            'Tailwind CSS'
        ],

        features: [
            'PDF upload and automated text extraction',
            'Document chunking and vector embedding generation',
            'Semantic search using a vector database',
            'Context-aware question answering with LLMs',
            'Source citation for retrieved document chunks',
            'Interactive chat interface for document conversations',
            'Responsive and intuitive user interface'
        ],

        challenges: [
            'Designing an effective chunking strategy to preserve context while improving retrieval accuracy',
            'Reducing hallucinations by grounding LLM responses in retrieved document content',
            'Optimizing semantic search for relevant context retrieval',
            'Building a clean full-stack architecture that separates document processing, retrieval, and response generation'
        ],

        solutions: [
            'Implemented a complete Retrieval-Augmented Generation (RAG) pipeline using LangChain',
            'Generated embeddings for document chunks and indexed them in ChromaDB for efficient similarity search',
            'Retrieved the most relevant document context before every LLM invocation to improve response accuracy',
            'Developed a modular FastAPI backend with a React frontend for document upload and conversational querying'
        ],

        github: 'https://github.com/kevinranpura',
        live: 'https://github.com/kevinranpura',
        featured: true
    },
    {
        id: 'musify',

        title: 'Musify Music Player',

        shortDescription: 'Full-stack music streaming application featuring secure authentication, playlist management, real-time music playback, and a responsive user experience.',

        fullDescription: 'Musify is a full-stack music streaming application that allows users to browse songs, create and manage playlists, and enjoy a seamless listening experience through an intuitive web interface. The project focuses on building a responsive and scalable music platform with secure authentication, efficient backend APIs, and smooth playback controls.',

        tags: [
            'React',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Tailwind CSS'
        ],

        features: [
            'Secure user authentication and account management',
            'Music browsing and search functionality',
            'Playlist creation and management',
            'Real-time music playback controls',
            'Responsive UI optimized for desktop and mobile',
            'RESTful backend APIs for music and user management'
        ],

        challenges: [
            'Managing application state across music playback, playlists, and user sessions',
            'Designing scalable backend APIs for music and playlist management',
            'Building a responsive interface that delivers a smooth listening experience',
            'Synchronizing frontend interactions with backend data efficiently'
        ],

        solutions: [
            'Implemented modular React components with centralized state management',
            'Developed RESTful Express APIs for user, music, and playlist operations',
            'Designed reusable UI components to improve maintainability and responsiveness',
            'Optimized API interactions to provide a consistent and seamless user experience'
        ],

        github: '',

        live: '',

        featured: false
    },
    {
        id: 'agentic-stock-recommendation',

        title: 'Agentic Stock Recommendation System',

        shortDescription: 'Multi-agent AI system that researches stocks using LangGraph, MCP tools, and LLMs to generate structured investment recommendations based on market data and recent news.',

        fullDescription: 'Agentic Stock Recommendation System is an AI-powered financial research application built using LangGraph and LangChain. The system employs multiple specialized AI agents coordinated by a supervisor agent to identify promising stocks, analyze live market data, summarize recent news, and generate structured investment recommendations. By leveraging MCP tools and LLM reasoning, the application demonstrates practical multi-agent orchestration for complex decision-making workflows.',

        tags: [
            'Python',
            'LangGraph',
            'LangChain',
            'FastAPI',
            'Groq API',
            'MCP'
        ],

        features: [
            'Multi-agent architecture with supervisor-based orchestration',
            'Automated stock discovery and market research',
            'Live market data retrieval through MCP tools',
            'AI-powered financial news analysis and summarization',
            'Structured investment recommendations with supporting insights',
            'Modular agent design for scalable AI workflows'
        ],

        challenges: [
            'Designing reliable coordination between multiple AI agents with clearly defined responsibilities',
            'Managing large LLM contexts while minimizing unnecessary token usage',
            'Generating consistent and structured outputs across different agent workflows',
            'Integrating multiple external tools while maintaining efficient execution'
        ],

        solutions: [
            'Built a supervisor-driven LangGraph workflow to coordinate specialized AI agents',
            'Optimized prompts and tool usage to reduce token consumption and improve response quality',
            'Implemented structured output generation for consistent investment reports',
            'Integrated MCP-based tools for market data retrieval and news analysis within a modular architecture'
        ],

        github: 'https://github.com/kevinranpura/agentic-stock-research',

        live: 'https://stocksage-ai-app.vercel.app/',

        featured: true
    },
    {
        id: 'mobile-pos-invoice',

        title: 'Mobile POS Invoice App',

        shortDescription: 'Offline-first mobile POS application developed during my internship at Petpooja for invoice generation, billing, and local data management using Next.js, Tauri, and Dexie.js.',

        fullDescription: 'The Mobile POS Invoice App was developed as part of my Software Engineer internship at Petpooja. The project focused on building a desktop-like mobile POS application capable of generating invoices and managing billing workflows in offline environments. Built using Next.js, Tauri, and Dexie.js, the application stores business data locally and synchronizes it when connectivity is available, enabling uninterrupted billing operations for restaurants and retail businesses.',

        tags: [
            'Next.js',
            'JavaScript',
            'Tauri',
            'Dexie.js',
            'IndexedDB'
        ],

        features: [
            'Offline-first invoice generation and billing workflow',
            'Fast local data storage using IndexedDB with Dexie.js',
            'Product and order management',
            'Responsive POS interface optimized for billing operations',
            'Automatic synchronization of local and remote data',
            'Modular architecture for scalable feature development'
        ],

        challenges: [
            'Designing a reliable offline-first architecture for uninterrupted billing operations',
            'Managing synchronization between local IndexedDB storage and backend services',
            'Ensuring data consistency across invoices, orders, and products',
            'Maintaining application performance while handling large local datasets'
        ],

        solutions: [
            'Leveraged Dexie.js to build an efficient IndexedDB-based local storage layer',
            'Implemented synchronization mechanisms to keep offline and online data consistent',
            'Optimized data access patterns to improve billing performance',
            'Developed reusable and modular components for easier maintenance and future enhancements'
        ],

        github: '',

        live: '',

        featured: false
    },
    {
        id: 'gesture-recognition',

        title: 'Gesture Recognition System',

        shortDescription: 'Computer vision application that recognizes hand gestures in real time using OpenCV and MediaPipe for intuitive human-computer interaction.',

        fullDescription: 'Gesture Recognition System is a computer vision application developed to recognize and classify hand gestures in real time using image processing and machine learning techniques. By leveraging OpenCV for video processing and MediaPipe for hand landmark detection, the system accurately tracks hand movements and identifies predefined gestures from a live webcam feed. The project demonstrates practical experience with real-time computer vision pipelines and AI-driven gesture recognition.',

        tags: [
            'Python',
            'OpenCV',
            'MediaPipe',
            'Computer Vision'
        ],

        features: [
            'Real-time hand gesture detection using webcam input',
            'Hand landmark tracking with MediaPipe',
            'Gesture classification from live video frames',
            'Efficient image preprocessing pipeline',
            'Interactive real-time prediction interface',
            'Optimized processing for smooth performance'
        ],

        challenges: [
            'Maintaining accurate gesture detection under varying lighting conditions',
            'Achieving real-time performance while processing continuous video frames',
            'Reducing false detections caused by background noise and hand positioning',
            'Ensuring consistent recognition across different users and hand orientations'
        ],

        solutions: [
            'Integrated MediaPipe for robust hand landmark detection and tracking',
            'Applied image preprocessing techniques to improve recognition accuracy',
            'Optimized the computer vision pipeline to minimize processing latency',
            'Tested and refined gesture recognition logic across different lighting conditions and hand positions'
        ],

        github: '',

        live: '',

        featured: false
    }
];