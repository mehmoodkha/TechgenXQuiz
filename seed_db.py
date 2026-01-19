import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from core.models import Topic, Question

def seed():
    print("Deleting old data...")
    Topic.objects.all().delete()
    Question.objects.all().delete()

    topics_data = [
        {'id': 'linux', 'name': 'Linux', 'icon': 'terminal', 'description': 'Core OS fundamentals, shell scripting, and kernel internals.', 'color': 'emerald-500'},
        {'id': 'cloud', 'name': 'Cloud', 'icon': 'cloud', 'description': 'AWS, Azure, and GCP architecture, IAM, and networking.', 'color': 'sky-500'},
        {'id': 'docker', 'name': 'Docker', 'icon': 'box', 'description': 'Containerization, layering, networking, and security.', 'color': 'blue-500'},
        {'id': 'ansible', 'name': 'Ansible', 'icon': 'settings', 'description': 'Configuration management, playbooks, and automation.', 'color': 'red-500'},
        {'id': 'terraform', 'name': 'Terraform', 'icon': 'cpu', 'description': 'Infrastructure as Code, state management, and providers.', 'color': 'purple-500'},
        {'id': 'jenkins', 'name': 'Jenkins', 'icon': 'refresh-cw', 'description': 'CI/CD pipelines, shared libraries, and distributed builds.', 'color': 'orange-500'},
        {'id': 'devops', 'name': 'DevOps', 'icon': 'tally-3', 'description': 'Culture, methodologies, and cross-functional practices.', 'color': 'indigo-500'},
        {'id': 'sre', 'name': 'SRE', 'icon': 'shield-check', 'description': 'Reliability, SLIs/SLOs, and incident management.', 'color': 'cyan-500'},
        {'id': 'python', 'name': 'Python', 'icon': 'code-2', 'description': 'Automation scripting, system integration, and data handling.', 'color': 'yellow-500'},
    ]

    print("Seeding topics...")
    for t in topics_data:
        topic = Topic.objects.create(
            id_str=t['id'],
            name=t['name'],
            icon=t['icon'],
            description=t['description'],
            color=t['color']
        )
        
        # Add a few sample questions per topic
        Question.objects.create(
            topic=topic,
            difficulty='Basic',
            text=f"What is the primary benefit of using {t['name']} in a production environment?",
            answer=f"{t['name']} provides scalability, reliability, and automation capabilities essential for modern infrastructure."
        )
        Question.objects.create(
            topic=topic,
            difficulty='Intermediate',
            text=f"Explain a common troubleshooting scenario you've faced with {t['name']}.",
            answer="Candidates should focus on isolation steps, logs analysis, and the resolution process used to minimize downtime."
        )

    print("Success: Database seeded with topics and sample questions.")

if __name__ == "__main__":
    seed()
