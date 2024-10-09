"""
NOTE: This isn't currently being used, however thinking about this so static building works w/ dynamic essay links
      ... and want that so everything is "automatically" handled in the markdown for `essays` specifically
          (or anything needing a dynamic route in the future)

"""

import os
import json
import re

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        markdown = file.read()

    # Extract links using a regular expression
    # TODO: Edit this so it separates the beginning part from the start of the list of essays
    #       Assume that with the first `-` is where the list starts until the end of the file
    link_pattern = re.compile(r'\[.*?\]\((.*?)\)')
    links = link_pattern.findall(markdown)

    return markdown, links

if __name__ == "__main__":
    file_path = os.path.abspath('static/writing/essays/_.md')
    content, links = parse_markdown(file_path)

    data = {
        'content': content,
        'links': links
    }

    output_path = 'src/lib/essays.json'
    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(data, file)
