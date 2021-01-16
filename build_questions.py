import glob
import yaml
import json

def main():

    final_json = []

    with open('questions/questions.yml', 'r') as f:
        config = yaml.load(f.read())

        questions = config['questions']

        for question in questions:

            with open(f'questions/{question["code"]}', 'r') as f:
                final_json.append({
                    'code': f.read(),
                    'prompt': question['prompt'],
                    'answers': question['answers'],
                    'correct': question['correct'],
                    'explanation': question['explanation']
                })

    with open('questions.js', 'w') as f:
        f.write(f'questions = {json.dumps(final_json)};')


if __name__ == '__main__':
    main()
