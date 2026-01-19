
import React from 'react';
import { 
  Tally3, 
  Cloud, 
  Box, 
  Terminal, 
  Settings, 
  RefreshCw, 
  ShieldCheck, 
  Cpu, 
  Code2 
} from 'lucide-react';
import { Difficulty, Topic, Question } from './types';

export const TOPICS: Topic[] = [
  { id: 'linux', name: 'Linux', icon: 'terminal', description: 'Core OS fundamentals, shell scripting, and kernel internals.', color: 'emerald-500' },
  { id: 'cloud', name: 'Cloud', icon: 'cloud', description: 'AWS, Azure, and GCP architecture, IAM, and networking.', color: 'sky-500' },
  { id: 'docker', name: 'Docker', icon: 'box', description: 'Containerization, layering, networking, and security.', color: 'blue-500' },
  { id: 'ansible', name: 'Ansible', icon: 'settings', description: 'Configuration management, playbooks, and automation.', color: 'red-500' },
  { id: 'terraform', name: 'Terraform', icon: 'cpu', description: 'Infrastructure as Code, state management, and providers.', color: 'purple-500' },
  { id: 'jenkins', name: 'Jenkins', icon: 'refresh-cw', description: 'CI/CD pipelines, shared libraries, and distributed builds.', color: 'orange-500' },
  { id: 'devops', name: 'DevOps', icon: 'tally-3', description: 'Culture, methodologies, and cross-functional practices.', color: 'indigo-500' },
  { id: 'sre', name: 'SRE', icon: 'shield-check', description: 'Reliability, SLIs/SLOs, and incident management.', color: 'cyan-500' },
  { id: 'python', name: 'Python', icon: 'code-2', description: 'Automation scripting, system integration, and data handling.', color: 'yellow-500' },
];

export const TOPIC_ICONS: Record<string, React.ReactNode> = {
  linux: <Terminal size={24} />,
  cloud: <Cloud size={24} />,
  docker: <Box size={24} />,
  ansible: <Settings size={24} />,
  terraform: <Cpu size={24} />,
  jenkins: <RefreshCw size={24} />,
  devops: <Tally3 size={24} />,
  sre: <ShieldCheck size={24} />,
  python: <Code2 size={24} />,
};

const generateMockQuestions = (topicId: string, diff: Difficulty, count: number, startId: string): Question[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${startId}-${i}`,
    topicId: topicId,
    difficulty: diff,
    question: `Scenario: You are troubleshooting a high latency issue in a ${topicId} environment. What specific ${diff} level steps would you take to identify the root cause?`,
    answer: `This is a comprehensive response for ${topicId} at the ${diff} level. In an interview, you should mention monitoring tools (like Prometheus or Datadog), logs (ELK/CloudWatch), and the specific architecture of ${topicId}. For question ${i+1}, focus on isolation, remediation, and preventing regression.`,
  }));
};

const linuxQuestions: Question[] = [
  { id: 'l-b-1', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'What is the purpose of the /etc/hosts file?', answer: 'It is a local lookup file used to map hostnames to IP addresses before querying DNS servers.' },
  { id: 'l-b-2', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'How do you check current memory usage?', answer: 'Use the "free -m" command to see memory in megabytes.', codeSnippet: 'free -m', language: 'bash' },
  { id: 'l-i-1', topicId: 'linux', difficulty: Difficulty.INTERMEDIATE, question: 'Explain the difference between soft and hard limits in Linux.', answer: 'Soft limits are thresholds that generate warnings but can be temporarily exceeded; hard limits are absolute maximums enforced by the kernel.' },
  ...generateMockQuestions('linux', Difficulty.BASIC, 18, 'l-b-ext'),
  ...generateMockQuestions('linux', Difficulty.INTERMEDIATE, 20, 'l-i-ext'),
  ...generateMockQuestions('linux', Difficulty.ADVANCED, 20, 'l-a-ext'),
];

const dockerQuestions: Question[] = [
  { id: 'dk-b-1', topicId: 'docker', difficulty: Difficulty.BASIC, question: 'What is a Docker image vs a Docker container?', answer: 'An image is a read-only template with instructions for creating a container; a container is a runnable instance of an image.' },
  { id: 'dk-i-1', topicId: 'docker', difficulty: Difficulty.INTERMEDIATE, question: 'What is the purpose of multi-stage builds?', answer: 'To optimize Dockerfile complexity and keep image sizes small by only copying the necessary artifacts from one stage to the final production image.' },
  ...generateMockQuestions('docker', Difficulty.BASIC, 19, 'dk-b-ext'),
  ...generateMockQuestions('docker', Difficulty.INTERMEDIATE, 20, 'dk-i-ext'),
  ...generateMockQuestions('docker', Difficulty.ADVANCED, 20, 'dk-a-ext'),
];

export const INITIAL_QUESTIONS: Question[] = [
  ...linuxQuestions,
  ...dockerQuestions,
  ...generateMockQuestions('cloud', Difficulty.BASIC, 17, 'cl-b'),
  ...generateMockQuestions('cloud', Difficulty.INTERMEDIATE, 17, 'cl-i'),
  ...generateMockQuestions('cloud', Difficulty.ADVANCED, 16, 'cl-a'),
  ...generateMockQuestions('ansible', Difficulty.BASIC, 17, 'ans-b'),
  ...generateMockQuestions('ansible', Difficulty.INTERMEDIATE, 17, 'ans-i'),
  ...generateMockQuestions('ansible', Difficulty.ADVANCED, 16, 'ans-a'),
  ...generateMockQuestions('terraform', Difficulty.BASIC, 17, 'tf-b'),
  ...generateMockQuestions('terraform', Difficulty.INTERMEDIATE, 17, 'tf-i'),
  ...generateMockQuestions('terraform', Difficulty.ADVANCED, 16, 'tf-a'),
  ...generateMockQuestions('jenkins', Difficulty.BASIC, 17, 'jk-b'),
  ...generateMockQuestions('jenkins', Difficulty.INTERMEDIATE, 17, 'jk-i'),
  ...generateMockQuestions('jenkins', Difficulty.ADVANCED, 16, 'jk-a'),
  ...generateMockQuestions('devops', Difficulty.BASIC, 17, 'do-b'),
  ...generateMockQuestions('devops', Difficulty.INTERMEDIATE, 17, 'do-i'),
  ...generateMockQuestions('devops', Difficulty.ADVANCED, 16, 'do-a'),
  ...generateMockQuestions('sre', Difficulty.BASIC, 17, 'sr-b'),
  ...generateMockQuestions('sre', Difficulty.INTERMEDIATE, 17, 'sr-i'),
  ...generateMockQuestions('sre', Difficulty.ADVANCED, 16, 'sr-a'),
  ...generateMockQuestions('python', Difficulty.BASIC, 17, 'py-b'),
  ...generateMockQuestions('python', Difficulty.INTERMEDIATE, 17, 'py-i'),
  ...generateMockQuestions('python', Difficulty.ADVANCED, 16, 'py-a'),
];
