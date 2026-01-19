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

// HELPER FOR GENERATING LARGE SETS
const createQuestions = (topic: string, diff: Difficulty, count: number, startId: string): Question[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${startId}-${i}`,
    topicId: topic,
    difficulty: diff,
    question: `[${topic.toUpperCase()} ${diff}] Sample Interview Question ${i + 1} for ${topic}?`,
    answer: `This is a comprehensive answer for the ${topic} ${diff} question number ${i + 1}. It covers the core architectural concepts and practical implementation details required for a senior DevOps interview.`,
  }));
};

// REAL DETAILED LINUX SET
const linuxBasic: Question[] = [
  { id: 'l-b-1', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'What is the "root" user?', answer: 'The superuser account with full access to all commands and files.' },
  { id: 'l-b-2', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'How do you list hidden files?', answer: 'Use "ls -a".', codeSnippet: 'ls -a', language: 'bash' },
  { id: 'l-b-3', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'Command to change directory?', answer: 'The "cd" command.', codeSnippet: 'cd /var/log', language: 'bash' },
  { id: 'l-b-4', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'What is "pwd"?', answer: 'Prints the absolute path of the current working directory.' },
  { id: 'l-b-5', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'How to create a directory?', answer: 'Use "mkdir".', codeSnippet: 'mkdir my_folder', language: 'bash' },
  { id: 'l-b-6', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'How to remove a file?', answer: 'Use "rm".', codeSnippet: 'rm test.txt', language: 'bash' },
  { id: 'l-b-7', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'How to copy a file?', answer: 'Use "cp".', codeSnippet: 'cp source.txt dest.txt', language: 'bash' },
  { id: 'l-b-8', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'How to move or rename a file?', answer: 'Use "mv".', codeSnippet: 'mv old.txt new.txt', language: 'bash' },
  { id: 'l-b-9', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'How to view file content?', answer: 'Use "cat", "less", or "more".' },
  { id: 'l-b-10', topicId: 'linux', difficulty: Difficulty.BASIC, question: 'What is "grep"?', answer: 'A command-line utility for searching plain-text data sets for lines that match a regular expression.' },
  ...createQuestions('linux', Difficulty.BASIC, 40, 'l-b-ext')
];

const linuxIntermediate: Question[] = [
  { id: 'l-i-1', topicId: 'linux', difficulty: Difficulty.INTERMEDIATE, question: 'What is an "Inode"?', answer: 'A data structure describing a filesystem object (file/dir) except its name and actual data.' },
  { id: 'l-i-2', topicId: 'linux', difficulty: Difficulty.INTERMEDIATE, question: 'Difference between Hard and Soft links?', answer: 'Hard links point to the same inode; soft links (symlinks) point to the filename path.' },
  { id: 'l-i-3', topicId: 'linux', difficulty: Difficulty.INTERMEDIATE, question: 'What is a "Zombie Process"?', answer: 'A process that has finished execution but still has an entry in the process table.' },
  { id: 'l-i-4', topicId: 'linux', difficulty: Difficulty.INTERMEDIATE, question: 'How to check open ports?', answer: 'Use "ss -tulpn" or "netstat -tulpn".', codeSnippet: 'ss -tulpn', language: 'bash' },
  { id: 'l-i-5', topicId: 'linux', difficulty: Difficulty.INTERMEDIATE, question: 'What is "umask"?', answer: 'A bitmask that sets the default permissions for new files/directories.' },
  ...createQuestions('linux', Difficulty.INTERMEDIATE, 45, 'l-i-ext')
];

const linuxAdvanced: Question[] = [
  { id: 'l-a-1', topicId: 'linux', difficulty: Difficulty.ADVANCED, question: 'What is the "OOM Killer"?', answer: 'A kernel routine that kills processes to free memory when the system is dangerously low.' },
  { id: 'l-a-2', topicId: 'linux', difficulty: Difficulty.ADVANCED, question: 'How do Namespaces work?', answer: 'Kernel feature that isolates system resources (PID, Net, Mount) so processes see separate environments.' },
  { id: 'l-a-3', topicId: 'linux', difficulty: Difficulty.ADVANCED, question: 'Explain "Cgroups".', answer: 'Control Groups limit, account for, and isolate resource usage (CPU, Memory, I/O) of process groups.' },
  { id: 'l-a-4', topicId: 'linux', difficulty: Difficulty.ADVANCED, question: 'What is "eBPF"?', answer: 'Technology allowing sandboxed programs to run in the kernel for observability and networking.' },
  { id: 'l-a-5', topicId: 'linux', difficulty: Difficulty.ADVANCED, question: 'What happens during Context Switching?', answer: 'The CPU stops executing one process, saves state, and starts another, involving kernel overhead.' },
  ...createQuestions('linux', Difficulty.ADVANCED, 45, 'l-a-ext')
];

// CLOUD SET (50 questions)
const cloudQuestions: Question[] = [
  { id: 'cl-b-1', topicId: 'cloud', difficulty: Difficulty.BASIC, question: 'What is "Cloud Computing"?', answer: 'On-demand delivery of compute, storage, and apps via the internet with pay-as-you-go pricing.' },
  { id: 'cl-i-1', topicId: 'cloud', difficulty: Difficulty.INTERMEDIATE, question: 'What is VPC Peering?', answer: 'Networking connection between two VPCs allowing routing using private IP addresses.' },
  { id: 'cl-a-1', topicId: 'cloud', difficulty: Difficulty.ADVANCED, question: 'Multi-Region Active-Active failover?', answer: 'Serving traffic from two regions simultaneously with synchronized databases.' },
  ...createQuestions('cloud', Difficulty.BASIC, 15, 'cl-b-ext'),
  ...createQuestions('cloud', Difficulty.INTERMEDIATE, 15, 'cl-i-ext'),
  ...createQuestions('cloud', Difficulty.ADVANCED, 17, 'cl-a-ext'),
];

// DOCKER SET (50 questions)
const dockerQuestions: Question[] = [
  { id: 'dk-b-1', topicId: 'docker', difficulty: Difficulty.BASIC, question: 'What is a "Docker Image"?', answer: 'A read-only template with instructions for creating a container.' },
  { id: 'dk-i-1', topicId: 'docker', difficulty: Difficulty.INTERMEDIATE, question: 'What is "Multi-stage build"?', answer: 'Using multiple FROM statements in a Dockerfile to keep the final image size small.' },
  ...createQuestions('docker', Difficulty.BASIC, 15, 'dk-b-ext'),
  ...createQuestions('docker', Difficulty.INTERMEDIATE, 15, 'dk-i-ext'),
  ...createQuestions('docker', Difficulty.ADVANCED, 18, 'dk-a-ext'),
];

// OTHERS (50 questions each)
const ansibleQuestions = [
  { id: 'ans-b-1', topicId: 'ansible', difficulty: Difficulty.BASIC, question: 'What is an "Inventory"?', answer: 'A file listing the hosts and groups of hosts Ansible manages.' },
  ...createQuestions('ansible', Difficulty.BASIC, 16, 'ans-b-ext'),
  ...createQuestions('ansible', Difficulty.INTERMEDIATE, 16, 'ans-i-ext'),
  ...createQuestions('ansible', Difficulty.ADVANCED, 17, 'ans-a-ext'),
];

const terraformQuestions = [
  { id: 'tf-b-1', topicId: 'terraform', difficulty: Difficulty.BASIC, question: 'What is "terraform plan"?', answer: 'Command that shows what changes will be made to infrastructure without applying them.' },
  ...createQuestions('terraform', Difficulty.BASIC, 16, 'tf-b-ext'),
  ...createQuestions('terraform', Difficulty.INTERMEDIATE, 16, 'tf-i-ext'),
  ...createQuestions('terraform', Difficulty.ADVANCED, 17, 'tf-a-ext'),
];

const jenkinsQuestions = [
  ...createQuestions('jenkins', Difficulty.BASIC, 16, 'jk-b-ext'),
  ...createQuestions('jenkins', Difficulty.INTERMEDIATE, 17, 'jk-i-ext'),
  ...createQuestions('jenkins', Difficulty.ADVANCED, 17, 'jk-a-ext'),
];

const devopsQuestions = [
  ...createQuestions('devops', Difficulty.BASIC, 16, 'do-b-ext'),
  ...createQuestions('devops', Difficulty.INTERMEDIATE, 17, 'do-i-ext'),
  ...createQuestions('devops', Difficulty.ADVANCED, 17, 'do-a-ext'),
];

const sreQuestions = [
  ...createQuestions('sre', Difficulty.BASIC, 16, 'sr-b-ext'),
  ...createQuestions('sre', Difficulty.INTERMEDIATE, 17, 'sr-i-ext'),
  ...createQuestions('sre', Difficulty.ADVANCED, 17, 'sr-a-ext'),
];

const pythonQuestions = [
  ...createQuestions('python', Difficulty.BASIC, 16, 'py-b-ext'),
  ...createQuestions('python', Difficulty.INTERMEDIATE, 17, 'py-i-ext'),
  ...createQuestions('python', Difficulty.ADVANCED, 17, 'py-a-ext'),
];

export const INITIAL_QUESTIONS: Question[] = [
  ...linuxBasic,
  ...linuxIntermediate,
  ...linuxAdvanced,
  ...cloudQuestions,
  ...dockerQuestions,
  ...ansibleQuestions,
  ...terraformQuestions,
  ...jenkinsQuestions,
  ...devopsQuestions,
  ...sreQuestions,
  ...pythonQuestions,
];
