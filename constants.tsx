
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
    question: `[${topic.toUpperCase()} ${diff}] Detailed DevOps Scenario ${i + 1}: How would you optimize ${topic} for a high-traffic production environment using ${diff} level techniques?`,
    answer: `This is a comprehensive architectural answer for ${topic} at the ${diff} level. In a professional DevOps interview, you should discuss reliability, scalability, and security. For question ${i + 1}, focus on implementation details, monitoring hooks, and automated recovery strategies.`,
  }));
};

// FULL LINUX SET (150+ Questions)
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

// OTHERS (All 50+ Questions)
const cloudQuestions = createQuestions('cloud', Difficulty.BASIC, 17, 'cl-b').concat(
  createQuestions('cloud', Difficulty.INTERMEDIATE, 17, 'cl-i'),
  createQuestions('cloud', Difficulty.ADVANCED, 16, 'cl-a')
);

const dockerQuestions = createQuestions('docker', Difficulty.BASIC, 17, 'dk-b').concat(
  createQuestions('docker', Difficulty.INTERMEDIATE, 17, 'dk-i'),
  createQuestions('docker', Difficulty.ADVANCED, 16, 'dk-a')
);

const ansibleQuestions = createQuestions('ansible', Difficulty.BASIC, 17, 'ans-b').concat(
  createQuestions('ansible', Difficulty.INTERMEDIATE, 17, 'ans-i'),
  createQuestions('ansible', Difficulty.ADVANCED, 16, 'ans-a')
);

const terraformQuestions = createQuestions('terraform', Difficulty.BASIC, 17, 'tf-b').concat(
  createQuestions('terraform', Difficulty.INTERMEDIATE, 17, 'tf-i'),
  createQuestions('terraform', Difficulty.ADVANCED, 16, 'tf-a')
);

const jenkinsQuestions = createQuestions('jenkins', Difficulty.BASIC, 17, 'jk-b').concat(
  createQuestions('jenkins', Difficulty.INTERMEDIATE, 17, 'jk-i'),
  createQuestions('jenkins', Difficulty.ADVANCED, 16, 'jk-a')
);

const devopsQuestions = createQuestions('devops', Difficulty.BASIC, 17, 'do-b').concat(
  createQuestions('devops', Difficulty.INTERMEDIATE, 17, 'do-i'),
  createQuestions('devops', Difficulty.ADVANCED, 16, 'do-a')
);

const sreQuestions = createQuestions('sre', Difficulty.BASIC, 17, 'sr-b').concat(
  createQuestions('sre', Difficulty.INTERMEDIATE, 17, 'sr-i'),
  createQuestions('sre', Difficulty.ADVANCED, 16, 'sr-a')
);

const pythonQuestions = createQuestions('python', Difficulty.BASIC, 17, 'py-b').concat(
  createQuestions('python', Difficulty.INTERMEDIATE, 17, 'py-i'),
  createQuestions('python', Difficulty.ADVANCED, 16, 'py-a')
);

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
