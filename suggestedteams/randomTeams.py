import random

def create_random_teams(people_per_team, list):
    i = 0
    teams = []
    team = []
    length = len(list)
    while length > 0:
       while (i < people_per_team and len(list) > 0):
           student = random.choice(list)
           team.append(student)
           list.remove(student)
           i += 1
       i = 0
       teams.append(team)
       team = []
       length = len(list)
    return teams
