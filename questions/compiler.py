import glob
import yaml
import json

def main():

    questions = []

    for name in glob.glob('*.yml'):
        with open(name, 'r') as f:
            config = yaml.load(f.read())

        with open(config['code'], 'r') as f:
            questions.append({
                'code': f.read(),
                'prompt': config['prompt'],
                'answers': config['answers'],
                'correct': config['correct'],
                'explanation': config['explanation']
            })

    print(f'let questions = {json.dumps(questions)};')


if __name__ == '__main__':
    main()
