import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShinyButton } from "@/components/ui/shiny-button";
import {
  Trophy,
  ShieldAlert,
  CheckCircle2,
  DollarSign,
  Calendar,
  Code2,
  ExternalLink,
  Search,
  Sparkles,
  BookOpen,
  Users,
  Target,
  ArrowRight,
  Flame,
  Globe,
  Clock,
  Compass,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Network,
  Cpu,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
export type CommunityActiveness = "Very High" | "High" | "Active";
export type ChatPlatform = "Slack" | "Discord" | "Mailing List & IRC";

export type OrgData = {
  rank: number;
  name: string;
  shortName: string;
  category: "Cloud Native" | "Operating Systems" | "Blockchain & Web3" | "Hardware & Systems" | "AI & Data" | "DevOps & CI/CD" | "Web & JavaScript" | "Graphics & Media" | "Enterprise";
  communityActiveness: CommunityActiveness;
  chatPlatform: ChatPlatform;
  communityChannel: string;
  githubUrl: string;
  techStack: string[];
  selected: number;
  graduated: number;
  programs: number;
  rate: number;
  appsPerSeat: number;
  type: "Paid" | "Unpaid / Mixed";
  frequency: "Every Term (3x/yr)" | "2x / Year" | "Annual (1x/yr)";
  keyProjects: string[];
  description: string;
};

export type CncfMaturity = "Graduated" | "Incubating" | "Sandbox";

export type CncfProjectData = {
  rank: number;
  name: string;
  maturity: CncfMaturity;
  communityActiveness: CommunityActiveness;
  chatPlatform: "Slack" | "Discord";
  communitySlack: string;
  tech: string[];
  selected: number;
  graduated: number;
  gradRate: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  frequency: "Every Term (3x/yr)" | "2x / Year" | "Annual";
  description: string;
  subProjectsOrSigs: string[];
  githubUrl: string;
};

// Comprehensive 15 Active Organizations across Linux Foundation in LFX Mentorship
const top15Orgs: OrgData[] = [
  {
    rank: 1,
    name: "CNCF (Cloud Native Computing Foundation)",
    shortName: "CNCF",
    category: "Cloud Native",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communityChannel: "CNCF Slack (slack.cncf.io #mentoring)",
    githubUrl: "https://github.com/cncf/mentoring",
    techStack: ["Golang", "Kubernetes", "Rust", "C++", "eBPF", "Prometheus"],
    selected: 943,
    graduated: 800,
    programs: 891,
    rate: 90,
    appsPerSeat: 41,
    type: "Paid",
    frequency: "Every Term (3x/yr)",
    keyProjects: ["Meshery", "WasmEdge", "KubeEdge", "Kyverno", "Kubernetes"],
    description: "The premier umbrella foundation hosting 180+ cloud native member projects. Largest recruiter across Spring, Summer, and Fall cycles.",
  },
  {
    rank: 2,
    name: "Linux Kernel (LKMP)",
    shortName: "Linux Kernel",
    category: "Operating Systems",
    communityActiveness: "Very High",
    chatPlatform: "Mailing List & IRC",
    communityChannel: "LKML Mailing Lists, IRC #kernelnewbies & Matrix",
    githubUrl: "https://github.com/torvalds/linux",
    techStack: ["C", "Assembly", "GDB", "Make", "Git", "Linux Internals"],
    selected: 560,
    graduated: 238,
    programs: 38,
    rate: 49,
    appsPerSeat: 9,
    type: "Unpaid / Mixed",
    frequency: "Every Term (3x/yr)",
    keyProjects: ["Kernel Bug Fixing Sessions", "Driver Subsystems", "Memory Management"],
    description: "Low-level operating system debugging and patch submission. High volume of entry-level seats with strict kernel coding discipline.",
  },
  {
    rank: 3,
    name: "LF Decentralized Trust (Hyperledger)",
    shortName: "LFDT",
    category: "Blockchain & Web3",
    communityActiveness: "High",
    chatPlatform: "Discord",
    communityChannel: "Hyperledger Discord (#mentorship, weekly SIGs)",
    githubUrl: "https://github.com/hyperledger",
    techStack: ["Golang", "Node.js", "Java", "Solidity", "Rust", "Cryptography"],
    selected: 270,
    graduated: 158,
    programs: 176,
    rate: 68,
    appsPerSeat: 34,
    type: "Paid",
    frequency: "Every Term (3x/yr)",
    keyProjects: ["Hyperledger Fabric", "Besu", "Aries", "Cacti", "FireFly"],
    description: "Enterprise grade distributed ledgers, cryptographic identity, and smart contract frameworks backed by major financial & tech enterprises.",
  },
  {
    rank: 4,
    name: "LF Connectivity – Magma Core",
    shortName: "Magma",
    category: "Enterprise",
    communityActiveness: "Active",
    chatPlatform: "Slack",
    communityChannel: "Magma Slack (#dev & #general channels)",
    githubUrl: "https://github.com/magma/magma",
    techStack: ["C", "C++", "Python", "Golang", "5G/LTE Core", "Networking"],
    selected: 189,
    graduated: 52,
    programs: 1,
    rate: 28,
    appsPerSeat: 3,
    type: "Unpaid / Mixed",
    frequency: "Annual (1x/yr)",
    keyProjects: ["Magma 5G Core", "Access Gateway", "Federation Gateway"],
    description: "Open-source mobile core network solution empowering telecom operators and private LTE/5G deployments globally.",
  },
  {
    rank: 5,
    name: "RISC-V International",
    shortName: "RISC-V",
    category: "Hardware & Systems",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communityChannel: "RISC-V Slack & Tech Working Groups",
    githubUrl: "https://github.com/riscv",
    techStack: ["C", "C++", "Assembly", "LLVM", "GCC", "QEMU", "Verilog"],
    selected: 148,
    graduated: 127,
    programs: 62,
    rate: 89,
    appsPerSeat: 61,
    type: "Paid",
    frequency: "Every Term (3x/yr)",
    keyProjects: ["QEMU RISC-V Target", "LLVM Compiler Backend", "Spike Simulator"],
    description: "Open standard instruction set architecture (ISA). Focuses on CPU emulation, compiler backends, and hardware-software co-design.",
  },
  {
    rank: 6,
    name: "Open Mainframe Project",
    shortName: "Open Mainframe",
    category: "Enterprise",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communityChannel: "Open Mainframe Slack (#zowe & #mentorship)",
    githubUrl: "https://github.com/openmainframeproject",
    techStack: ["TypeScript", "Node.js", "Java", "COBOL", "C", "React"],
    selected: 98,
    graduated: 80,
    programs: 77,
    rate: 94,
    appsPerSeat: 85,
    type: "Paid",
    frequency: "Every Term (3x/yr)",
    keyProjects: ["Zowe CLI & Web UI", "COBOL Check", "Mainframe Modernization"],
    description: "Modernizing enterprise compute architectures. Leads with highest mentee completion rate (94%) and high competitive applicant ratio.",
  },
  {
    rank: 7,
    name: "LF AI & Data Foundation",
    shortName: "LF AI & Data",
    category: "AI & Data",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communityChannel: "LF AI & Data Slack (#mentorship & #pytorch)",
    githubUrl: "https://github.com/lfai",
    techStack: ["Python", "PyTorch", "C++", "Rust", "Ray", "CUDA", "gRPC"],
    selected: 62,
    graduated: 54,
    programs: 45,
    rate: 87,
    appsPerSeat: 38,
    type: "Paid",
    frequency: "Every Term (3x/yr)",
    keyProjects: ["Flyte Orchestrator", "Milvus Vector DB", "ONNX Runtime", "Horovod"],
    description: "Hosts leading open source artificial intelligence, ML workflow orchestration, vector databases, and neural network interchange formats.",
  },
  {
    rank: 8,
    name: "Continuous Delivery Foundation (CDF)",
    shortName: "CDF",
    category: "DevOps & CI/CD",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communityChannel: "CDF Slack (#mentorship, #jenkins, #tekton)",
    githubUrl: "https://github.com/cdfoundation",
    techStack: ["Golang", "Java", "Kubernetes", "TypeScript", "CI/CD Pipelines"],
    selected: 54,
    graduated: 48,
    programs: 38,
    rate: 89,
    appsPerSeat: 32,
    type: "Paid",
    frequency: "Every Term (3x/yr)",
    keyProjects: ["Jenkins Core", "Tekton Pipelines", "Spinnaker", "CDEvents"],
    description: "Home of the world's most ubiquitous automated release pipelines and GitOps continuous delivery engines.",
  },
  {
    rank: 9,
    name: "OpenJS Foundation",
    shortName: "OpenJS",
    category: "Web & JavaScript",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communityChannel: "OpenJS Slack & Node.js GitHub/Discord",
    githubUrl: "https://github.com/openjs-foundation",
    techStack: ["JavaScript", "TypeScript", "Node.js", "C++", "V8 Engine", "Web APIs"],
    selected: 44,
    graduated: 39,
    programs: 32,
    rate: 89,
    appsPerSeat: 45,
    type: "Paid",
    frequency: "2x / Year",
    keyProjects: ["Node.js Core", "Electron", "Webpack", "Appium Mobile", "Mocha"],
    description: "Champions the sustainable growth of the JavaScript and web ecosystem, standardizing key browser and server runtime runtimes.",
  },
  {
    rank: 10,
    name: "Cloudforet",
    shortName: "Cloudforet",
    category: "Cloud Native",
    communityActiveness: "Active",
    chatPlatform: "Discord",
    communityChannel: "Cloudforet Discord & GitHub Discussions",
    githubUrl: "https://github.com/cloudforet-io",
    techStack: ["Python", "TypeScript", "Vue.js", "FastAPI", "Multi-Cloud APIs"],
    selected: 38,
    graduated: 34,
    programs: 25,
    rate: 89,
    appsPerSeat: 22,
    type: "Paid",
    frequency: "2x / Year",
    keyProjects: ["Cost Billing Analyzer", "Multi-Cloud Asset Inventory", "Plugin Engine"],
    description: "Open-source multi-cloud management platform for analyzing and optimizing cloud infrastructure across AWS, GCP, and Azure.",
  },
  {
    rank: 11,
    name: "LF Networking (LFN)",
    shortName: "LFN",
    category: "Enterprise",
    communityActiveness: "High",
    chatPlatform: "Discord",
    communityChannel: "LFN Wiki & Telecom Discord/SIG Calls",
    githubUrl: "https://github.com/lf-networking",
    techStack: ["Golang", "C++", "Java", "Python", "OpenFlow", "BGP / SDN"],
    selected: 34,
    graduated: 29,
    programs: 18,
    rate: 85,
    appsPerSeat: 18,
    type: "Paid",
    frequency: "2x / Year",
    keyProjects: ["ONAP Automation", "Anuket Cloud", "OpenDaylight", "FD.io / VPP"],
    description: "Carrier-grade open networking architectures, software defined networking (SDN), and network function virtualization (NFV).",
  },
  {
    rank: 12,
    name: "Academy Software Foundation (ASWF)",
    shortName: "ASWF",
    category: "Graphics & Media",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communityChannel: "ASWF Slack (#mentorship & #opencolorio)",
    githubUrl: "https://github.com/AcademySoftwareFoundation",
    techStack: ["C++", "Python", "OpenGL", "Vulkan", "OpenEXR", "OpenVDB", "USD"],
    selected: 32,
    graduated: 29,
    programs: 22,
    rate: 91,
    appsPerSeat: 52,
    type: "Paid",
    frequency: "Annual (1x/yr)",
    keyProjects: ["OpenColorIO", "OpenEXR Image Format", "OpenVDB Volumetrics"],
    description: "Formed by the Academy of Motion Picture Arts and Sciences for open-source visual effects (VFX), computer animation, and media authoring.",
  },
  {
    rank: 13,
    name: "GraphQL Foundation",
    shortName: "GraphQL",
    category: "Web & JavaScript",
    communityActiveness: "Active",
    chatPlatform: "Discord",
    communityChannel: "GraphQL Discord (#mentoring & #working-groups)",
    githubUrl: "https://github.com/graphql",
    techStack: ["TypeScript", "JavaScript", "Golang", "Rust", "GraphQL AST"],
    selected: 26,
    graduated: 23,
    programs: 19,
    rate: 88,
    appsPerSeat: 36,
    type: "Paid",
    frequency: "2x / Year",
    keyProjects: ["GraphQL.js", "GraphiQL Studio", "DataLoader", "GraphQL over HTTP"],
    description: "Advancing the query language for APIs, schema validation tooling, and developer client libraries used by millions of web applications.",
  },
  {
    rank: 14,
    name: "Confidential Computing Consortium (CCC)",
    shortName: "CCC",
    category: "Hardware & Systems",
    communityActiveness: "High",
    chatPlatform: "Discord",
    communityChannel: "CCC Discord & Security Working Groups",
    githubUrl: "https://github.com/confidential-computing-consortium",
    techStack: ["Rust", "C", "Assembly", "TEE (SGX/SEV)", "Cryptography"],
    selected: 24,
    graduated: 21,
    programs: 16,
    rate: 87,
    appsPerSeat: 28,
    type: "Paid",
    frequency: "2x / Year",
    keyProjects: ["Enarx", "Veraison Attestation", "Keystone Enclave Framework"],
    description: "Accelerating the adoption of hardware-enforced Trusted Execution Environments (TEEs) to protect data in use in cloud infrastructure.",
  },
  {
    rank: 15,
    name: "Automotive Grade Linux (AGL)",
    shortName: "AGL",
    category: "Operating Systems",
    communityActiveness: "Active",
    chatPlatform: "Mailing List & IRC",
    communityChannel: "AGL Developer Syncs & Yocto Developer Channels",
    githubUrl: "https://github.com/automotive-grade-linux",
    techStack: ["C", "C++", "Qt/QML", "Yocto Project", "Embedded Linux", "Wayland"],
    selected: 22,
    graduated: 18,
    programs: 14,
    rate: 82,
    appsPerSeat: 16,
    type: "Paid",
    frequency: "Annual (1x/yr)",
    keyProjects: ["AGL Unified Code Base", "Vehicle API Framework", "Flutter on AGL"],
    description: "Open source software stack for in-vehicle infotainment (IVI), instrument clusters, and connected telematics adopted by leading automakers.",
  },
];

// Top 16 Active CNCF Member Projects / Sub-Organizations in LFX
const cncfUmbrellaProjects: CncfProjectData[] = [
  {
    rank: 1,
    name: "Meshery (Layer5)",
    maturity: "Incubating",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communitySlack: "Layer5 Slack (5.5k+ devs, #meshery-ci)",
    tech: ["Golang", "React", "GraphQL", "Kubernetes", "gRPC", "Wasm"],
    selected: 79,
    graduated: 68,
    gradRate: "86%",
    difficulty: "Intermediate",
    frequency: "Every Term (3x/yr)",
    description: "The cloud native manager. Offers visual multi-mesh topology design, service mesh lifecycle management, and performance benchmarking.",
    subProjectsOrSigs: ["MeshKit Engine", "SMP Benchmark", "Meshery Cloud", "UI Extensions"],
    githubUrl: "https://github.com/meshery/meshery",
  },
  {
    rank: 2,
    name: "WasmEdge Runtime",
    maturity: "Incubating",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#wasmedge) & Discord",
    tech: ["Rust", "C++", "WebAssembly", "LLVM", "Edge AI", "Python"],
    selected: 58,
    graduated: 48,
    gradRate: "83%",
    difficulty: "Advanced",
    frequency: "Every Term (3x/yr)",
    description: "High-performance WebAssembly runtime optimized for cloud native, microservices, edge computing, and decentralized AI inference.",
    subProjectsOrSigs: ["LlamaEdge (LLM)", "WasmEdge-TensorFlow", "Rust Crate SDK", "Wasm-gRPC"],
    githubUrl: "https://github.com/WasmEdge/WasmEdge",
  },
  {
    rank: 3,
    name: "KubeEdge",
    maturity: "Incubating",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#kubeedge, bi-weekly syncs)",
    tech: ["Golang", "Kubernetes", "IoT", "Edge Computing", "MQTT"],
    selected: 58,
    graduated: 47,
    gradRate: "81%",
    difficulty: "Intermediate",
    frequency: "Every Term (3x/yr)",
    description: "Extends native Kubernetes container orchestration capabilities to edge hosts, IoT gateways, and connected hardware devices.",
    subProjectsOrSigs: ["Sedna (AI Edge)", "Ianvs (Benchmarking)", "CloudCore", "EdgeMesh"],
    githubUrl: "https://github.com/kubeedge/kubeedge",
  },
  {
    rank: 4,
    name: "Kyverno",
    maturity: "Incubating",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#kyverno, maintainer office hours)",
    tech: ["Golang", "Kubernetes CRDs", "Policy-as-Code", "Security", "JMESPath"],
    selected: 56,
    graduated: 49,
    gradRate: "88%",
    difficulty: "Intermediate",
    frequency: "Every Term (3x/yr)",
    description: "Kubernetes-native policy management engine. Validate, mutate, generate, and verify Kubernetes resources and supply chain artifacts.",
    subProjectsOrSigs: ["Kyverno CLI", "Policy Reporter", "Chain-bench", "Kyverno JSON Engine"],
    githubUrl: "https://github.com/kyverno/kyverno",
  },
  {
    rank: 5,
    name: "Kubernetes (SIGs & Core)",
    maturity: "Graduated",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communitySlack: "Kubernetes Slack (85k+ devs, #sig-contribex)",
    tech: ["Golang", "Kubernetes API", "Distributed Systems", "Testing", "Bash"],
    selected: 47,
    graduated: 42,
    gradRate: "89%",
    difficulty: "Advanced",
    frequency: "Every Term (3x/yr)",
    description: "The container orchestration standard. Mentorships span upstream Special Interest Groups (SIGs) with core maintainers.",
    subProjectsOrSigs: ["SIG-Node", "SIG-Testing", "SIG-CLI (kubectl)", "Cluster API", "SIG-Docs"],
    githubUrl: "https://github.com/kubernetes/kubernetes",
  },
  {
    rank: 6,
    name: "Volcano",
    maturity: "Incubating",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#volcano, AI Batch WG)",
    tech: ["Golang", "Kubernetes Scheduler", "PyTorch", "TensorFlow", "HPC"],
    selected: 41,
    graduated: 36,
    gradRate: "88%",
    difficulty: "Advanced",
    frequency: "2x / Year",
    description: "Cloud native batch computing system providing scheduling mechanisms for high-performance AI/ML, BigData, and distributed workloads.",
    subProjectsOrSigs: ["Volcano Scheduler", "Batch Controller", "MPI Plugin", "GPU Sharing"],
    githubUrl: "https://github.com/volcano-sh/volcano",
  },
  {
    rank: 7,
    name: "Chaos Mesh",
    maturity: "Incubating",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#chaos-mesh, weekly triage)",
    tech: ["Golang", "Rust", "Chaos Engineering", "Kubernetes", "eBPF"],
    selected: 36,
    graduated: 32,
    gradRate: "89%",
    difficulty: "Intermediate",
    frequency: "2x / Year",
    description: "Cloud-native chaos engineering platform that orchestrates fault injection experiments across pods, networks, kernels, and clocks.",
    subProjectsOrSigs: ["Chaos Dashboard", "Chaos Daemon", "Bypass eBPF Driver", "Workflow Engine"],
    githubUrl: "https://github.com/chaos-mesh/chaos-mesh",
  },
  {
    rank: 8,
    name: "Prometheus & Thanos",
    maturity: "Graduated",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#prometheus & #thanos)",
    tech: ["Golang", "React", "PromQL", "TSDB", "Distributed Storage"],
    selected: 35,
    graduated: 32,
    gradRate: "91%",
    difficulty: "Advanced",
    frequency: "Every Term (3x/yr)",
    description: "Leading metrics monitoring and alerting toolkit with dimensional data model and scalable multi-cluster Thanos query engines.",
    subProjectsOrSigs: ["Node Exporter", "Alertmanager", "Thanos Query", "PromQL Parser"],
    githubUrl: "https://github.com/prometheus/prometheus",
  },
  {
    rank: 9,
    name: "OpenTelemetry (OTel)",
    maturity: "Incubating",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (15k+ devs, #otel-mentoring)",
    tech: ["Golang", "Java", "Python", "Rust", "TypeScript", "C++"],
    selected: 34,
    graduated: 31,
    gradRate: "91%",
    difficulty: "Intermediate",
    frequency: "Every Term (3x/yr)",
    description: "High-quality, ubiquitous telemetry standard for generating, collecting, and exporting distributed traces, metrics, and logs.",
    subProjectsOrSigs: ["OTel Collector", "Semantic Conventions", "Auto-Instrumentation", "OTel-Go/Rust"],
    githubUrl: "https://github.com/open-telemetry/opentelemetry-collector",
  },
  {
    rank: 10,
    name: "Cilium & eBPF",
    maturity: "Graduated",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communitySlack: "Cilium Slack (20k+ devs, #cilium-dev)",
    tech: ["C", "Golang", "eBPF", "Linux Kernel", "Kubernetes Networking"],
    selected: 32,
    graduated: 29,
    gradRate: "90%",
    difficulty: "Advanced",
    frequency: "Every Term (3x/yr)",
    description: "eBPF-based networking, observability, and security. Provides transparent network connectivity and L7 service mesh without sidecars.",
    subProjectsOrSigs: ["Cilium CNI", "Hubble Observability", "Tetragon Security", "eBPF Datapath"],
    githubUrl: "https://github.com/cilium/cilium",
  },
  {
    rank: 11,
    name: "Argo Project (Argo CD & Workflows)",
    maturity: "Graduated",
    communityActiveness: "Very High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#argo-cd & #argo-workflows)",
    tech: ["Golang", "TypeScript", "React", "Kubernetes", "GitOps"],
    selected: 30,
    graduated: 27,
    gradRate: "90%",
    difficulty: "Intermediate",
    frequency: "Every Term (3x/yr)",
    description: "Declarative GitOps continuous delivery tool for Kubernetes, parallel workflow orchestration, and progressive rollout automation.",
    subProjectsOrSigs: ["Argo CD", "Argo Workflows", "Argo Rollouts", "Argo Events"],
    githubUrl: "https://github.com/argoproj/argo-cd",
  },
  {
    rank: 12,
    name: "Envoy Proxy",
    maturity: "Graduated",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communitySlack: "Envoy Slack (10k+ devs, weekly maintainers)",
    tech: ["C++", "Golang", "Bazel", "WebAssembly", "Networking"],
    selected: 28,
    graduated: 26,
    gradRate: "92%",
    difficulty: "Advanced",
    frequency: "2x / Year",
    description: "High-performance L7 cloud-native proxy and communication bus designed for large modern service-oriented microservice architectures.",
    subProjectsOrSigs: ["Envoy Gateway", "Envoy Mobile", "Wasm Filter Plugins", "xDS Protocol"],
    githubUrl: "https://github.com/envoyproxy/envoy",
  },
  {
    rank: 13,
    name: "Vitess",
    maturity: "Graduated",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#vitess, weekly office hours)",
    tech: ["Golang", "MySQL", "Raft", "Distributed Storage", "gRPC"],
    selected: 25,
    graduated: 22,
    gradRate: "88%",
    difficulty: "Advanced",
    frequency: "2x / Year",
    description: "Database clustering system for horizontal scaling of MySQL through sharding, powering hyperscale architectures like YouTube and GitHub.",
    subProjectsOrSigs: ["VTGate Query Router", "VTTablet", "VTOrc Orchestrator", "VReplication"],
    githubUrl: "https://github.com/vitessio/vitess",
  },
  {
    rank: 14,
    name: "Helm",
    maturity: "Graduated",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#helm-users & #helm-dev)",
    tech: ["Golang", "Kubernetes", "Package Manager", "YAML", "SemVer"],
    selected: 24,
    graduated: 22,
    gradRate: "91%",
    difficulty: "Intermediate",
    frequency: "2x / Year",
    description: "The package manager for Kubernetes. Helps find, share, and use software built for containerized infrastructure.",
    subProjectsOrSigs: ["Helm CLI", "Chart Testing Tooling", "Artifact Hub Integration", "Helm SDK"],
    githubUrl: "https://github.com/helm/helm",
  },
  {
    rank: 15,
    name: "cert-manager",
    maturity: "Graduated",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#cert-manager)",
    tech: ["Golang", "X.509 Cryptography", "TLS/SSL", "Kubernetes Webhooks"],
    selected: 22,
    graduated: 20,
    gradRate: "89%",
    difficulty: "Intermediate",
    frequency: "2x / Year",
    description: "Automates the management and issuance of TLS certificates from Let's Encrypt, HashiCorp Vault, and Venafi in cloud native clusters.",
    subProjectsOrSigs: ["Trust-Manager", "CSI-Driver", "Approver Policy", "Vault Issuer"],
    githubUrl: "https://github.com/cert-manager/cert-manager",
  },
  {
    rank: 16,
    name: "KEDA (Event-driven Autoscaling)",
    maturity: "Graduated",
    communityActiveness: "High",
    chatPlatform: "Slack",
    communitySlack: "CNCF Slack (#keda)",
    tech: ["Golang", "Kubernetes HPA", "Event Streaming", "Cloud SDKs"],
    selected: 20,
    graduated: 18,
    gradRate: "90%",
    difficulty: "Intermediate",
    frequency: "2x / Year",
    description: "Kubernetes Event-driven Autoscaling. Drive the scaling of any container based on metrics from Kafka, AWS SQS, Azure Event Hubs, and RabbitMQ.",
    subProjectsOrSigs: ["KEDA Core Operator", "KEDA HTTP Add-on", "50+ Builtin Scalers"],
    githubUrl: "https://github.com/kedacore/keda",
  },
];

const annualTerms = [
  {
    term: "Term 1: Spring",
    duration: "March – May",
    appsOpen: "Jan 15 – Feb 05",
    color: "from-emerald-500 to-teal-600",
    description: "The first annual cycle. CNCF, RISC-V, and Hyperledger list the year's initial major architecture initiatives.",
    status: "Upcoming Cycle",
  },
  {
    term: "Term 2: Summer",
    duration: "June – August",
    appsOpen: "Apr 15 – May 10",
    color: "from-amber-500 to-orange-600",
    description: "Aligns with student summer breaks. Highest applicant volume across all foundations with high seat availability.",
    status: "Peak Volume",
  },
  {
    term: "Term 3: Fall",
    duration: "September – November",
    appsOpen: "Jul 20 – Aug 15",
    color: "from-blue-500 to-indigo-600",
    description: "The autumn term. Excellent opportunity for contributors who began engaging during the summer to land funded seats.",
    status: "Best Contributor Advantage",
  },
];

const strategySteps = [
  {
    num: "01",
    title: "Track CNCF & Org Mentorship Issues Early",
    desc: "Projects post their mentorship proposals in the official GitHub repository (e.g. cncf/mentoring) 3-4 weeks before the LFX portal opens. Star that repo to get notified immediately.",
    badge: "3-4 Weeks Prior",
    icon: Compass,
  },
  {
    num: "02",
    title: "Join Project Slack/Discord & Introduce Yourself",
    desc: "Join the project's official Slack channel or Discord server. Introduce yourself in #mentorship or #dev, mention the specific issue you're targeting, and link your past work.",
    badge: "Community First",
    icon: Users,
  },
  {
    num: "03",
    title: "Submit a Prerequisite PR (Crucial)",
    desc: "Mentors almost never pick blind proposals. Solve at least 1-2 small 'good first issues' or documentation gaps in that specific repository before the application deadline.",
    badge: "Highest Selection Factor",
    icon: Code2,
  },
  {
    num: "04",
    title: "Craft a Tight, Milestoned Proposal",
    desc: "Write a 2-3 page proposal with a week-by-week implementation plan, architecture diagram, risk mitigation, and your merged pull request links.",
    badge: "Quality Over Length",
    icon: Target,
  },
];

const countryTiers = [
  {
    tier: "Tier 1: High PPP",
    countries: "United States, Canada, UK, Germany, Australia, Switzerland, Japan",
    fullTime: "$6,600",
    partTime: "$3,300",
    details: "Adjusted for standard cost of living index in North America, Western Europe, and high-income regions.",
  },
  {
    tier: "Tier 2: Mid PPP",
    countries: "Poland, Brazil, Mexico, South Africa, Malaysia, Romania",
    fullTime: "$4,500",
    partTime: "$2,250",
    details: "Standard midpoint stipend scaled for mid-index economies.",
  },
  {
    tier: "Tier 3: Emerging PPP",
    countries: "India, Nigeria, Pakistan, Indonesia, Kenya, Bangladesh, Vietnam",
    fullTime: "$3,000",
    partTime: "$1,500",
    details: "Calibrated based on purchasing power parity. CNCF and Foundation mentors disburse in 2 milestones (Midterm + Final).",
  },
];

export default function LfxInsightsPage() {
  // State for Foundation Orgs table
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrgCategory, setSelectedOrgCategory] = useState("All");
  const [selectedActiveness, setSelectedActiveness] = useState("All");
  const [sortBy, setSortBy] = useState<"selected" | "gradRate" | "appsPerSeat" | "rank">("rank");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // State for CNCF Member Projects section
  const [cncfSearch, setCncfSearch] = useState("");
  const [cncfMaturity, setCncfMaturity] = useState<"All" | CncfMaturity>("All");
  const [cncfTech, setCncfTech] = useState("All");
  const [cncfActiveness, setCncfActiveness] = useState("All");
  const [cncfPage, setCncfPage] = useState(1);
  const cncfItemsPerPage = 6;

  const [activeTier, setActiveTier] = useState(2); // Tier 3 by default for high student base

  // Filter Foundation organizations
  const filteredOrgs = useMemo(() => {
    return top15Orgs
      .filter((org) => {
        const matchesCategory = selectedOrgCategory === "All" || org.category === selectedOrgCategory;
        const matchesActiveness = selectedActiveness === "All" || org.communityActiveness === selectedActiveness;
        const matchesSearch =
          org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          org.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          org.communityChannel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          org.chatPlatform.toLowerCase().includes(searchQuery.toLowerCase()) ||
          org.githubUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
          org.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          org.keyProjects.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesActiveness && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "rank") return a.rank - b.rank;
        if (sortBy === "selected") return b.selected - a.selected;
        if (sortBy === "gradRate") return b.rate - a.rate;
        if (sortBy === "appsPerSeat") return b.appsPerSeat - a.appsPerSeat;
        return 0;
      });
  }, [searchQuery, selectedOrgCategory, selectedActiveness, sortBy]);

  // Foundation Orgs pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredOrgs.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedOrgs = useMemo(() => {
    return filteredOrgs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrgs, startIndex, itemsPerPage]);

  // Filter CNCF Member Projects
  const filteredCncfProjects = useMemo(() => {
    return cncfUmbrellaProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(cncfSearch.toLowerCase()) ||
        project.description.toLowerCase().includes(cncfSearch.toLowerCase()) ||
        project.communitySlack.toLowerCase().includes(cncfSearch.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(cncfSearch.toLowerCase())) ||
        project.subProjectsOrSigs.some((s) => s.toLowerCase().includes(cncfSearch.toLowerCase()));

      const matchesMaturity = cncfMaturity === "All" || project.maturity === cncfMaturity;
      const matchesTech =
        cncfTech === "All" || project.tech.some((t) => t.toLowerCase() === cncfTech.toLowerCase());
      const matchesActiveness = cncfActiveness === "All" || project.communityActiveness === cncfActiveness;

      return matchesSearch && matchesMaturity && matchesTech && matchesActiveness;
    });
  }, [cncfSearch, cncfMaturity, cncfTech, cncfActiveness]);

  // CNCF Projects pagination calculations
  const totalCncfPages = Math.max(1, Math.ceil(filteredCncfProjects.length / cncfItemsPerPage));
  const safeCncfPage = Math.min(cncfPage, totalCncfPages);
  const startCncfIndex = (safeCncfPage - 1) * cncfItemsPerPage;
  const paginatedCncfProjects = useMemo(() => {
    return filteredCncfProjects.slice(startCncfIndex, startCncfIndex + cncfItemsPerPage);
  }, [filteredCncfProjects, startCncfIndex, cncfItemsPerPage]);

  const allTechOptions = ["All", "Golang", "Rust", "C++", "React", "Kubernetes", "TypeScript", "Python", "eBPF"];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-b from-blue-500/10 via-cyan-500/5 to-transparent blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[140px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        {/* Hero Section */}
        <div className="pt-8 md:pt-16 pb-12 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 mb-6 text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>The Linux Foundation & CNCF Mentorship Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          >
            LFX Mentorship Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Discover the <span className="text-foreground font-semibold">Top 15 Active Foundations</span>, their official Slack & Discord community hubs, and explore the <span className="text-foreground font-semibold">CNCF Umbrella Member Projects</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a href="https://mentorship.lfx.linuxfoundation.org/" target="_blank" rel="noreferrer">
              <ShinyButton className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 text-sm py-4 px-6">
                <span className="flex items-center gap-2">
                  Official LFX Portal <ExternalLink className="w-4 h-4" />
                </span>
              </ShinyButton>
            </a>
            <a href="https://github.com/cncf/mentoring" target="_blank" rel="noreferrer">
              <ShinyButton className="bg-muted text-foreground hover:bg-muted/80 border border-border text-sm py-4 px-6">
                <span className="flex items-center gap-2">
                  CNCF Mentoring Repo <ExternalLink className="w-4 h-4" />
                </span>
              </ShinyButton>
            </a>
          </motion.div>
        </div>

        {/* Live Animated Stat Tickers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Card className="border-border/60 bg-card/60 backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <div className="absolute top-0 left-0 h-1 w-full bg-blue-500" />
            <CardContent className="p-5">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Top 15 Orgs</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-3xl font-black text-foreground">
                <NumberTicker value={15} />
                <span className="text-blue-500"> Orgs</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Active across Linux Fdn</p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="absolute top-0 left-0 h-1 w-full bg-cyan-500" />
            <CardContent className="p-5">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">CNCF Share</span>
                <Globe className="w-4 h-4 text-cyan-500" />
              </div>
              <div className="text-3xl font-black text-foreground">
                <NumberTicker value={38} />
                <span className="text-cyan-500">%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">943 funded positions</p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="absolute top-0 left-0 h-1 w-full bg-emerald-500" />
            <CardContent className="p-5">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Paid Grad Rate</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-3xl font-black text-foreground">
                <NumberTicker value={90} />
                <span className="text-emerald-500">%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">CNCF, RISC-V & Mainframe</p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur-sm relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
            <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500" />
            <CardContent className="p-5">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Terms / Year</span>
                <Calendar className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-3xl font-black text-foreground">
                <span>3x</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Spring, Summer & Fall</p>
            </CardContent>
          </Card>
        </div>

        {/* The Big Picture: Market Share & Program Breakdown */}
        <div className="bg-muted/30 border border-border/60 rounded-2xl p-6 md:p-8 mb-16 backdrop-blur-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" /> Program Breakdown
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Top Foundations Drive 90% of All Mentorship Seats
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                <strong className="text-foreground">CNCF operates as an umbrella</strong> hosting 180+ cloud native projects (Kubernetes, Meshery, WasmEdge, Cilium, Kyverno, etc.) representing 943 (38%) selections. Linux Kernel (560), LF Decentralized Trust (270), and <strong className="text-foreground">LF AI & Data</strong> make up the rest of the ecosystem.
              </p>
              <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldAlert className="w-4 h-4 text-amber-500" /> Paid vs Unpaid Reality Check
                </div>
                <p className="text-xs text-muted-foreground leading-normal">
                  Unpaid cohorts (like Linux Kernel) have high seat counts and lower applicant barriers (9 apps/seat), but only 28–49% finish. Paid CNCF, RISC-V, Open Mainframe, and LF AI projects provide direct mentor stipends and graduate ~90%.
                </p>
              </div>
            </div>

            {/* Visual Bar Comparison */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="space-y-3 bg-card/80 p-5 rounded-xl border border-border/80 shadow-sm">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-blue-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> CNCF Umbrella (Cloud Native)
                    </span>
                    <span className="font-mono">943 seats (38%) • 90% Grad</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "38%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-emerald-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Linux Kernel (LKMP)
                    </span>
                    <span className="font-mono">560 seats (22%) • 49% Grad</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "22%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-purple-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> LF Decentralized Trust
                    </span>
                    <span className="font-mono">270 seats (11%) • 68% Grad</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "11%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-purple-500 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-amber-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> RISC-V, Mainframe, AI & CDF
                    </span>
                    <span className="font-mono">362 seats (15%) • ~90% Grad</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "15%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                      className="h-full bg-amber-500 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" /> Magma, OpenJS, ASWF & Others
                    </span>
                    <span className="font-mono">321 seats (14%)</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "14%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      className="h-full bg-zinc-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top 15 Active Organizations Database with Slack/Discord Badges & Pagination */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-500 mb-1">
                <Trophy className="w-4 h-4" /> Comprehensive Foundation Directory
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Top 15 Active Organizations in LFX</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Explore participating Linux Foundation orgs, their official Slack/Discord channels, tech stacks, and frequency.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[180px] flex-1 sm:flex-initial">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search org, tech, or project..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <select
                value={selectedOrgCategory}
                onChange={(e) => {
                  setSelectedOrgCategory(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter organizations by category"
                className="px-2.5 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="All">All Domains</option>
                <option value="Cloud Native">Cloud Native</option>
                <option value="AI & Data">AI & Data</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Blockchain & Web3">Blockchain & Web3</option>
                <option value="Hardware & Systems">Hardware & Systems</option>
                <option value="DevOps & CI/CD">DevOps & CI/CD</option>
                <option value="Web & JavaScript">Web & JavaScript</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Graphics & Media">Graphics & Media</option>
              </select>

              <select
                value={selectedActiveness}
                onChange={(e) => {
                  setSelectedActiveness(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by community activeness"
                className="px-2.5 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="All">All Activeness</option>
                <option value="Very High">🟢 Very High Activity</option>
                <option value="High">🔵 High Activity</option>
                <option value="Active">🟣 Active</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                aria-label="Sort organizations"
                className="px-2.5 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="rank">Sort: Overall Rank</option>
                <option value="selected">Sort: Most Selected</option>
                <option value="gradRate">Sort: Grad Rate</option>
                <option value="appsPerSeat">Sort: Competition (Apps/Seat)</option>
              </select>
            </div>
          </div>

          {/* Community Slack / Discord Tip Banner */}
          <div className="mb-4 p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-center gap-3 text-xs text-muted-foreground">
            <MessageCircle className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <strong className="text-foreground font-semibold">Every Org Hosts an Active Community:</strong> Every mentoring organization has an official <strong>Slack Workspace</strong> or <strong>Discord Server</strong> where mentors review drafts and help applicants. Join their channel before applying!
            </div>
          </div>

          <Card className="overflow-hidden border-border/70 shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead className="min-w-[260px]">Organization & Tech Stack</TableHead>
                    <TableHead className="min-w-[220px]">Slack / Discord Community & Activity</TableHead>
                    <TableHead className="text-center">Frequency</TableHead>
                    <TableHead className="text-right">Selected</TableHead>
                    <TableHead className="text-right">Grad Rate</TableHead>
                    <TableHead className="text-right">Apps / Seat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {paginatedOrgs.length > 0 ? (
                      paginatedOrgs.map((org) => (
                        <TableRow key={org.name} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-bold text-center font-mono">
                            {org.rank === 1 ? (
                              <span className="text-yellow-500 font-bold" title="Rank 1">🥇</span>
                            ) : org.rank === 2 ? (
                              <span className="text-zinc-400 font-bold" title="Rank 2">🥈</span>
                            ) : org.rank === 3 ? (
                              <span className="text-amber-600 font-bold" title="Rank 3">🥉</span>
                            ) : (
                              <span className="text-muted-foreground">{org.rank}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-foreground flex flex-wrap items-center gap-2">
                              <span>{org.name}</span>
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal">
                                {org.category}
                              </Badge>
                              <a
                                href={org.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded border border-primary/25 transition-colors shrink-0"
                                title={`Open ${org.name} GitHub Repository`}
                              >
                                <span>GitHub Repo</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{org.description}</div>
                            
                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap items-center gap-1 mt-2">
                              <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1 mr-1">
                                <Code2 className="w-3 h-3 text-cyan-500" /> Stack:
                              </span>
                              {org.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-muted/80 text-foreground/80 font-mono font-medium border border-border/50"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </TableCell>

                          {/* Community Platform Badge & Channel */}
                          <TableCell>
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Badge
                                variant="outline"
                                className={`text-[10px] px-2 py-0.5 font-semibold flex items-center gap-1 ${
                                  org.chatPlatform === "Slack"
                                    ? "border-purple-500/40 text-purple-400 bg-purple-500/10"
                                    : org.chatPlatform === "Discord"
                                    ? "border-indigo-500/40 text-indigo-400 bg-indigo-500/10"
                                    : "border-amber-500/40 text-amber-400 bg-amber-500/10"
                                }`}
                              >
                                <MessageCircle className="w-3 h-3" />
                                {org.chatPlatform}
                              </Badge>

                              {org.communityActiveness === "Very High" ? (
                                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  Very High
                                </span>
                              ) : org.communityActiveness === "High" ? (
                                <span className="text-[10px] font-semibold text-blue-400 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  High
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-zinc-400 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                  Active
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                              <MessageSquare className="w-3 h-3 text-muted-foreground/70 shrink-0" />
                              <span className="truncate max-w-[220px]" title={org.communityChannel}>
                                {org.communityChannel}
                              </span>
                            </div>
                          </TableCell>

                          {/* Frequency */}
                          <TableCell className="text-center">
                            <span className="text-xs font-mono text-muted-foreground block">
                              {org.frequency}
                            </span>
                            <Badge
                              variant={org.type === "Paid" ? "default" : "secondary"}
                              className={
                                org.type === "Paid"
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 text-[10px] mt-1"
                                  : "text-[10px] mt-1"
                              }
                            >
                              {org.type}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-right font-mono font-medium">
                            <div>{org.selected}</div>
                            <div className="text-[10px] text-muted-foreground">{org.graduated} graduated</div>
                          </TableCell>

                          <TableCell className="text-right">
                            <Badge
                              variant={org.rate >= 85 ? "default" : org.rate >= 60 ? "secondary" : "destructive"}
                              className={
                                org.rate >= 85
                                  ? "bg-green-500/20 text-green-700 dark:text-green-400 border-0"
                                  : org.rate >= 60
                                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-400 border-0"
                                  : "bg-red-500/20 text-red-700 dark:text-red-400 border-0"
                              }
                            >
                              {org.rate}%
                            </Badge>
                          </TableCell>

                          <TableCell className="text-right font-mono">
                            <span
                              className={
                                org.appsPerSeat >= 50
                                  ? "text-red-500 font-semibold"
                                  : org.appsPerSeat >= 25
                                  ? "text-amber-500 font-medium"
                                  : "text-emerald-500 font-medium"
                              }
                            >
                              {org.appsPerSeat} : 1
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No organizations found matching your search or filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 bg-muted/20 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-muted-foreground flex items-center gap-2">
                <span>
                  Showing <strong className="text-foreground">{Math.min(startIndex + 1, filteredOrgs.length)}</strong> to{" "}
                  <strong className="text-foreground">{Math.min(startIndex + itemsPerPage, filteredOrgs.length)}</strong> of{" "}
                  <strong className="text-foreground">{filteredOrgs.length}</strong> organizations
                </span>

                <span className="hidden sm:inline text-muted-foreground/60">•</span>

                {/* Items per page selector */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <span>Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    aria-label="Items per page"
                    className="bg-card border border-border rounded px-1.5 py-0.5 text-xs text-foreground focus:outline-none"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                  <span>per page</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(Math.max(1, safeCurrentPage - 1))}
                  disabled={safeCurrentPage === 1}
                  className="p-1.5 rounded-md border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[28px] h-7 px-2 rounded-md font-medium text-xs transition-colors ${
                      safeCurrentPage === page
                        ? "bg-primary text-primary-foreground shadow-sm font-bold"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="p-1.5 rounded-md border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Dedicated CNCF Umbrella Member Projects Deep Dive */}
        <div className="mb-20">
          {/* CNCF Umbrella Foundation Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-950/30 via-cyan-950/20 to-card border border-blue-500/30 mb-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
                  <Network className="w-3.5 h-3.5" /> Umbrella Foundation Architecture
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  CNCF is an Umbrella: 180+ Independent Projects & Sub-Orgs
                </h2>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  The <strong className="text-foreground">Cloud Native Computing Foundation (CNCF)</strong> does not function as a single monolithic repository. It is an umbrella organization that hosts <strong className="text-foreground">180+ independent open-source projects</strong>. Each project conducts its own mentorship selection, provides its own mentors, and maintains its own community Slack channels.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs px-3 py-1 font-semibold">
                  🏆 Graduated
                </Badge>
                <Badge variant="outline" className="border-blue-500/40 text-blue-400 bg-blue-500/10 text-xs px-3 py-1 font-semibold">
                  🚀 Incubating
                </Badge>
                <Badge variant="outline" className="border-purple-500/40 text-purple-400 bg-purple-500/10 text-xs px-3 py-1 font-semibold">
                  🧪 Sandbox
                </Badge>
              </div>
            </div>

            {/* Architecture Tip Box */}
            <div className="mt-6 p-4 rounded-xl bg-card/80 border border-border/80 flex items-start gap-3 text-xs text-muted-foreground">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground font-semibold">Important Applicant Rule:</strong> You cannot submit an application to &quot;CNCF&quot; as a whole. In LFX, you apply directly to a specific CNCF sub-organization (e.g. <em>Layer5 Meshery</em>, <em>WasmEdge</em>, or <em>Kubernetes SIG-Node</em>). Contributing to that specific sub-project beforehand is what earns your acceptance.
              </div>
            </div>
          </div>

          {/* Directory Subheading */}
          <div className="border-t border-border pt-6 mb-6">
            <h3 className="text-2xl font-bold tracking-tight">Explore Active CNCF Member Projects</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Filter the complete directory of CNCF graduated, incubating, and sandbox projects by tech stack, community channel, and status.
            </p>
          </div>

          {/* CNCF Search & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search CNCF project, SIG, or tech..."
                  value={cncfSearch}
                  onChange={(e) => {
                    setCncfSearch(e.target.value);
                    setCncfPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <select
                value={cncfMaturity}
                onChange={(e) => {
                  setCncfMaturity(e.target.value as any);
                  setCncfPage(1);
                }}
                aria-label="Filter by CNCF maturity status"
                className="px-2.5 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="All">All Maturity Levels</option>
                <option value="Graduated">🏆 Graduated</option>
                <option value="Incubating">🚀 Incubating</option>
                <option value="Sandbox">🧪 Sandbox</option>
              </select>

              <select
                value={cncfActiveness}
                onChange={(e) => {
                  setCncfActiveness(e.target.value);
                  setCncfPage(1);
                }}
                aria-label="Filter by CNCF community activeness"
                className="px-2.5 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="All">All Community Activity</option>
                <option value="Very High">🟢 Very High Activity</option>
                <option value="High">🔵 High Activity</option>
              </select>
            </div>

            {/* Language filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {allTechOptions.map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    setCncfTech(tech);
                    setCncfPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    cncfTech === tech
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* CNCF Project Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            <AnimatePresence mode="popLayout">
              {paginatedCncfProjects.length > 0 ? (
                paginatedCncfProjects.map((project, i) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <Card className="h-full flex flex-col justify-between border-border/70 hover:border-blue-500/50 transition-all hover:shadow-md bg-card/60 backdrop-blur-sm group">
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Badge
                                variant="outline"
                                className={`text-[10px] px-2 py-0.2 font-semibold ${
                                  project.maturity === "Graduated"
                                    ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                                    : project.maturity === "Incubating"
                                    ? "border-blue-500/40 text-blue-400 bg-blue-500/10"
                                    : "border-purple-500/40 text-purple-400 bg-purple-500/10"
                                }`}
                              >
                                {project.maturity === "Graduated" ? "🏆 " : project.maturity === "Incubating" ? "🚀 " : "🧪 "}
                                {project.maturity}
                              </Badge>

                              <Badge variant="secondary" className="text-[10px] py-0 px-1.5 text-muted-foreground">
                                Rank #{project.rank}
                              </Badge>
                            </div>

                            <CardTitle className="text-lg font-bold flex items-center gap-1.5 group-hover:text-primary transition-colors">
                              {project.name}
                            </CardTitle>
                          </div>

                          <Badge
                            variant="secondary"
                            className={`text-[10px] shrink-0 ${
                              project.difficulty === "Beginner"
                                ? "text-emerald-500 bg-emerald-500/10"
                                : project.difficulty === "Intermediate"
                                ? "text-amber-500 bg-amber-500/10"
                                : "text-red-500 bg-red-500/10"
                            }`}
                          >
                            {project.difficulty}
                          </Badge>
                        </div>

                        <CardDescription className="text-xs mt-2 text-foreground/80 line-clamp-2">
                          {project.description}
                        </CardDescription>

                        {/* Sub-projects / SIGs chips */}
                        <div className="pt-2">
                          <div className="text-[10px] text-muted-foreground font-semibold mb-1 flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-blue-400" /> Sub-Projects & SIGs:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {project.subProjectsOrSigs.map((sub) => (
                              <span key={sub} className="text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-mono">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5 pt-0 space-y-4">
                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/80 text-foreground/80 font-medium border border-border/50">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Community Slack Channel */}
                        <div className="p-2 rounded-lg bg-blue-500/5 border border-blue-500/15 flex items-center justify-between text-[11px]">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-blue-400 shrink-0" />
                            <span className="truncate max-w-[180px]">{project.communitySlack}</span>
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-400">
                            {project.communityActiveness}
                          </span>
                        </div>

                        {/* Stats & Graduation */}
                        <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-muted/40 border border-border/50 text-center">
                          <div>
                            <div className="text-[11px] text-muted-foreground">Selected</div>
                            <div className="font-mono font-bold text-sm text-foreground">{project.selected}</div>
                          </div>
                          <div>
                            <div className="text-[11px] text-muted-foreground">Graduated</div>
                            <div className="font-mono font-bold text-sm text-foreground">{project.graduated}</div>
                          </div>
                          <div>
                            <div className="text-[11px] text-muted-foreground">Grad Rate</div>
                            <div className="font-mono font-bold text-sm text-emerald-500">{project.gradRate}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-500" /> {project.frequency}
                          </span>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                          >
                            GitHub Repo <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No CNCF projects match your current filters.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* CNCF Pagination Controls */}
          {filteredCncfProjects.length > 0 && (
            <div className="p-4 bg-muted/20 border border-border rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-muted-foreground">
                Showing <strong className="text-foreground">{startCncfIndex + 1}</strong> to{" "}
                <strong className="text-foreground">{Math.min(startCncfIndex + cncfItemsPerPage, filteredCncfProjects.length)}</strong> of{" "}
                <strong className="text-foreground">{filteredCncfProjects.length}</strong> CNCF member projects
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCncfPage(Math.max(1, safeCncfPage - 1))}
                  disabled={safeCncfPage === 1}
                  className="p-1.5 rounded-md border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous CNCF page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalCncfPages }, (_, idx) => idx + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCncfPage(page)}
                    className={`min-w-[28px] h-7 px-2 rounded-md font-medium text-xs transition-colors ${
                      safeCncfPage === page
                        ? "bg-primary text-primary-foreground shadow-sm font-bold"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCncfPage(Math.min(totalCncfPages, safeCncfPage + 1))}
                  disabled={safeCncfPage === totalCncfPages}
                  className="p-1.5 rounded-md border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next CNCF page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3-Term Annual Timeline & Cycles */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 mb-2">
              <Calendar className="w-4 h-4" /> Three Terms Every Year
            </div>
            <h2 className="text-3xl font-bold tracking-tight">The LFX Mentorship Annual Lifecycle</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Unlike GSoC (once a year), LFX offers 3 distinct mentorship cycles so you can apply all year round.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {annualTerms.map((term, i) => (
              <motion.div
                key={term.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full relative overflow-hidden border-border/70 bg-card/60 backdrop-blur-sm flex flex-col justify-between">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${term.color}`} />
                  <CardHeader className="p-6 pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {term.status}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">{term.duration}</span>
                    </div>
                    <CardTitle className="text-xl font-bold">{term.term}</CardTitle>
                    <div className="text-xs font-semibold text-primary mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Applications: {term.appsOpen}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">{term.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stipend Benchmarks & Tier Calculator */}
        <div className="bg-muted/20 border border-border/60 rounded-2xl p-6 md:p-8 mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 mb-1">
                <DollarSign className="w-4 h-4" /> Purchasing Power Parity (PPP)
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Stipend Rates & Regional Tiers</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                LFX provides funded stipends calibrated by location and project commitment (Full-time: 40 hrs/wk, Part-time: 20 hrs/wk).
              </p>
            </div>

            {/* Tier Tabs */}
            <div className="flex gap-1.5 p-1 bg-card rounded-lg border border-border">
              {countryTiers.map((tier, index) => (
                <button
                  key={tier.tier}
                  onClick={() => setActiveTier(index)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeTier === index
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Tier {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tier Card */}
          <div className="bg-card rounded-xl p-6 border border-border/80 shadow-sm">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <Badge className="bg-emerald-500/15 text-emerald-500 border-0 text-xs">
                  {countryTiers[activeTier].tier}
                </Badge>
                <div className="text-sm font-semibold text-foreground">
                  Typical Countries:
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {countryTiers[activeTier].countries}
                </div>
                <div className="text-xs text-muted-foreground/80 pt-1">
                  {countryTiers[activeTier].details}
                </div>
              </div>

              <div className="md:col-span-5 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-muted/50 border border-border/60 text-center">
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Full-Time (350h)</span>
                  <div className="text-2xl font-black text-emerald-500 mt-1">
                    {countryTiers[activeTier].fullTime}
                  </div>
                  <span className="text-[10px] text-muted-foreground">Paid in 2 milestones</span>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border/60 text-center">
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Part-Time (175h)</span>
                  <div className="text-2xl font-black text-blue-500 mt-1">
                    {countryTiers[activeTier].partTime}
                  </div>
                  <span className="text-[10px] text-muted-foreground">Paid in 2 milestones</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Win an LFX Mentorship (Strategy Guide) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 mb-2">
              <BookOpen className="w-4 h-4" /> The Accepted Contributor's Playbook
            </div>
            <h2 className="text-3xl font-bold tracking-tight">How to Win an LFX Mentorship Seat</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Top mentors evaluate hundreds of candidates. Follow these proven tactical steps to stand out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {strategySteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full border-border/70 bg-card/60 backdrop-blur-sm flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-primary/40 font-mono">{step.num}</span>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <step.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <CardTitle className="text-base font-bold">{step.title}</CardTitle>
                    <Badge variant="outline" className="text-[10px] mt-1.5 text-primary border-primary/20 w-fit">
                      {step.badge}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer CTA Banner */}
        <div className="relative rounded-2xl p-8 md:p-12 overflow-hidden border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-background text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Ready to land your first Linux Foundation Mentorship?
            </h3>
            <p className="text-sm text-muted-foreground">
              Practice Git workflows in our Interactive Lab, explore beginner-friendly issues, and build the credibility mentors look for.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a href="/lab">
                <ShinyButton className="bg-primary text-primary-foreground text-sm py-4 px-6">
                  Practice in the Git Lab →
                </ShinyButton>
              </a>
              <a href="/issues">
                <ShinyButton className="bg-card text-foreground border border-border text-sm py-4 px-6">
                  Find Good First Issues
                </ShinyButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
