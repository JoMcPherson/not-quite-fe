DROP TABLE IF EXISTS event_attendees;

DROP TABLE IF EXISTS events;

CREATE TABLE events(
    id serial PRIMARY KEY,
    title varchar(255) NOT NULL,
    address varchar(255),
    city varchar(255),
    state varchar(255),
    zip varchar(20),
    description text,
    cognito_user_id varchar(255),
    date timestamp,
    image varchar(255),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    last_updated timestamp DEFAULT CURRENT_TIMESTAMP,
    cancelled boolean DEFAULT FALSE,
    max_attendees int NOT NULL,
    sport varchar(255) NOT NULL
);

CREATE TABLE event_attendees(
    id serial PRIMARY KEY,
    event_id int NOT NULL,
    cognito_user_id varchar(255) NOT NULL,
    joined_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    CONSTRAINT unique_event_user UNIQUE (event_id, cognito_user_id)
);

INSERT INTO events(title, street, city, state, zip, description, cognito_user_id, date, image, created_at, last_updated, cancelled, max_attendees, sport)
    VALUES ('Acrobatics Performance', '123 Gymnasium St', 'Denver', 'CO', '80204', 'Join us for an exciting acrobatics performance.', 'cognito-user-1', '2024-09-01 10:00:00', '/images/acrobatics.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 30, 'Acrobatics'),
('Archery Competition', '456 Archery Rd', 'Boise', 'ID', '83702', 'Test your archery skills in this competition.', 'cognito-user-1', '2024-09-02 11:00:00', '/images/archery.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 25, 'Archery'),
('Artistic Swimming Showcase', '789 Aquatic Ave', 'Orlando', 'FL', '32801', 'Watch amazing routines in artistic swimming.', 'cognito-user-1', '2024-09-03 12:00:00', '/images/artistic_swimming.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Artistic Swimming'),
('Track Meet', '101 Track Blvd', 'Eugene', 'OR', '97401', 'Compete in various track and field events.', 'cognito-user-1', '2024-09-04 09:00:00', '/images/track.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 40, 'Track and Field'),
('Badminton Tournament', '123 Sports Hall Rd', 'San Diego', 'CA', '92103', 'Join the badminton tournament and showcase your skills.', 'cognito-user-1', '2024-09-05 14:00:00', '/images/badminton.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 15, 'Badminton'),
('Baseball/Softball Game', '456 Baseball Field St', 'St. Louis', 'MO', '63103', 'Enjoy a thrilling baseball/softball game.', 'cognito-user-1', '2024-09-06 16:00:00', '/images/baseball_softball.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 50, 'Baseball/Softball'),
('Basketball Pick-Up Game', '789 Basketball Ct', 'Chicago', 'IL', '60605', 'Come join a casual pick-up basketball game.', 'cognito-user-1', '2024-09-07 18:00:00', '/images/basketball.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 30, 'Basketball'),
('Handball Match', '101 Indoor Arena Ln', 'Phoenix', 'AZ', '85003', 'Participate in an exciting handball match.', 'cognito-user-1', '2024-09-08 19:00:00', '/images/handball.avif', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Handball'),
('Volleyball Tournament', '123 Beach Volleyball Blvd', 'Miami', 'FL', '33139', 'Join the volleyball tournament at the beach.', 'cognito-user-1', '2024-09-09 10:00:00', '/images/volleyball.avif', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 25, 'Volleyball'),
('Biathlon Challenge', '456 Ski Resort Ln', 'Aspen', 'CO', '81611', 'Take part in a biathlon challenge combining skiing and shooting.', 'cognito-user-1', '2024-09-10 07:00:00', '/images/biathlon.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 15, 'Biathlon'),
('Bobsleigh Race', '789 Bobsleigh Track Rd', 'Lake Placid', 'NY', '12946', 'Experience the thrill of bobsleigh racing.', 'cognito-user-1', '2024-09-11 13:00:00', '/images/bobsleigh.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 40, 'Bobsleigh'),
('Boxing Tournament', '101 Boxing Gym St', 'Las Vegas', 'NV', '89101', 'Watch intense boxing matches in the tournament.', 'cognito-user-1', '2024-09-12 15:00:00', '/images/boxing.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Boxing'),
('Break Dancing Battle', '123 Dance Studio Rd', 'Brooklyn', 'NY', '11201', 'Show off your break dancing skills in this battle.', 'cognito-user-1', '2024-09-13 17:00:00', '/images/break_dancing.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 25, 'Break Dancing'),
('Canoe Regatta', '456 Lake Dr', 'Seattle', 'WA', '98101', 'Participate in an exciting canoe regatta.', 'cognito-user-1', '2024-09-14 09:00:00', '/images/canoe.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 10, 'Canoe'),
('Cricket Match', '789 Cricket Ground Rd', 'Houston', 'TX', '77002', 'Join the cricket match and enjoy the game.', 'cognito-user-1', '2024-09-15 12:00:00', '/images/cricket.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 30, 'Cricket'),
('Curling Event', '101 Curling Rink Ln', 'Minneapolis', 'MN', '55401', 'Test your skills in this curling event.', 'cognito-user-1', '2024-09-16 14:00:00', '/images/curling.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 15, 'Curling'),
('Cycling Race', '123 Cycling Track Rd', 'Portland', 'OR', '97201', 'Race in a thrilling cycling competition.', 'cognito-user-1', '2024-09-17 08:00:00', '/images/cycling.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 45, 'Cycling'),
('Diving Competition', '456 Diving Pool Rd', 'Los Angeles', 'CA', '90015', 'Compete in a diving competition.', 'cognito-user-1', '2024-09-18 10:00:00', '/images/diving.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Diving'),
('Equestrian Show', '789 Equestrian Center Dr', 'Lexington', 'KY', '40507', 'Enjoy a beautiful equestrian show.', 'cognito-user-1', '2024-09-19 11:00:00', '/images/equestrian.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 35, 'Equestrian'),
('Fencing Tournament', '101 Fencing Hall Rd', 'Philadelphia', 'PA', '19103', 'Participate in a fencing tournament.', 'cognito-user-1', '2024-09-20 13:00:00', '/images/fencing.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 10, 'Fencing'),
('Figure Skating Gala', '123 Ice Rink Dr', 'Detroit', 'MI', '48226', 'Watch stunning figure skating performances.', 'cognito-user-1', '2024-09-21 14:00:00', '/images/figure_skating.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 30, 'Figure Skating'),
('Flag Football Game', '456 Football Field Rd', 'Dallas', 'TX', '75201', 'Join a fun flag football game.', 'cognito-user-1', '2024-09-22 15:00:00', '/images/flag_football.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 25, 'Flag Football'),
('Soccer Match', '789 Soccer Field Rd', 'Kansas City', 'MO', '64106', 'Participate in an exciting soccer match.', 'cognito-user-1', '2024-09-23 16:00:00', '/images/soccer.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 50, 'Soccer'),
('Golf Tournament', '101 Golf Course Dr', 'Augusta', 'GA', '30904', 'Join the golf tournament and showcase your skills.', 'cognito-user-1', '2024-09-24 17:00:00', '/images/golf.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 15, 'Golf'),
('Hockey Game', '123 Ice Rink Dr', 'Boston', 'MA', '02215', 'Enjoy a thrilling hockey game.', 'cognito-user-1', '2024-09-25 18:00:00', '/images/hockey.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 40, 'Hockey'),
('Judo Contest', '456 Judo Arena Dr', 'San Francisco', 'CA', '94103', 'Compete in a judo contest.', 'cognito-user-1', '2024-09-26 19:00:00', '/images/judo.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 15, 'Judo'),
('Karate Championship', '789 Karate Dojo Dr', 'Honolulu', 'HI', '96814', 'Show your karate skills in this championship.', 'cognito-user-1', '2024-09-27 20:00:00', '/images/karate.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Karate'),
('Mountain Biking Event', '101 Mountain Trail Rd', 'Boulder', 'CO', '80302', 'Ride through challenging trails in this mountain biking event.', 'cognito-user-1', '2024-09-28 07:00:00', '/images/mountain_biking.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 30, 'Mountain Biking'),
('Rhythmic Gymnastics Showcase', '123 Gymnastics Hall Dr', 'Atlanta', 'GA', '30303', 'Watch amazing performances in rhythmic gymnastics.', 'cognito-user-1', '2024-09-29 09:00:00', '/images/rhythmic_gymnastics.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Rhythmic Gymnastics'),
('Rugby Match', '456 Rugby Field Rd', 'Salt Lake City', 'UT', '84101', 'Join a rugby match and enjoy the game.', 'cognito-user-1', '2024-09-30 11:00:00', '/images/rugby.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 35, 'Rugby'),
('Sailing Regatta', '789 Marina Dr', 'Newport', 'RI', '02840', 'Sail in a competitive regatta.', 'cognito-user-1', '2024-10-01 12:00:00', '/images/sailing.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 10, 'Sailing'),
('Shooting Competition', '101 Shooting Range Dr', 'Houston', 'TX', '77007', 'Compete in a shooting competition.', 'cognito-user-1', '2024-10-02 14:00:00', '/images/shooting.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Shooting'),
('Skateboarding Jam', '123 Skate Park Rd', 'Venice', 'CA', '90291', 'Show off your skateboarding skills in this jam.', 'cognito-user-1', '2024-10-03 16:00:00', '/images/skateboarding.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 25, 'Skateboarding'),
('Sport Climbing Event', '456 Climbing Gym Dr', 'Salt Lake City', 'UT', '84111', 'Test your climbing skills in this sport climbing event.', 'cognito-user-1', '2024-10-04 18:00:00', '/images/sport_climbing.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Sport Climbing'),
('Surfing Competition', '789 Surf Beach Rd', 'Huntington Beach', 'CA', '92648', 'Ride the waves in this exciting surfing competition.', 'cognito-user-1', '2024-10-05 07:00:00', '/images/surfing.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 15, 'Surfing'),
('Taekwondo Tournament', '101 Martial Arts Dojo Dr', 'Austin', 'TX', '78701', 'Compete in a taekwondo tournament.', 'cognito-user-1', '2024-10-06 09:00:00', '/images/taekwondo.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Taekwondo'),
('Tennis Open', '123 Tennis Court Dr', 'Wimbledon', 'MA', '02457', 'Join the tennis open and compete for the title.', 'cognito-user-1', '2024-10-07 11:00:00', '/images/tennis.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 30, 'Tennis'),
('Triathlon', '456 Race Course Rd', 'San Diego', 'CA', '92109', 'Participate in a challenging triathlon.', 'cognito-user-1', '2024-10-08 13:00:00', '/images/triathlon.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 50, 'Triathlon'),
('Water Polo Match', '789 Water Arena Dr', 'Fort Lauderdale', 'FL', '33301', 'Join a water polo match and have fun in the water.', 'cognito-user-1', '2024-10-09 15:00:00', '/images/water_polo.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Water Polo'),
('Weightlifting Competition', '101 Fitness Center Dr', 'Columbus', 'OH', '43215', 'Compete in a weightlifting competition.', 'cognito-user-1', '2024-10-10 17:00:00', '/images/weightlifting.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 15, 'Weightlifting'),
('Wrestling Match', '123 Wrestling Arena Rd', 'Des Moines', 'IA', '50309', 'Join a wrestling match and showcase your strength.', 'cognito-user-1', '2024-10-11 19:00:00', '/images/wrestling.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 20, 'Wrestling'),
('Wushu Event', '456 Martial Arts St', 'San Francisco', 'CA', '94102', 'Experience the art of wushu in this event.', 'cognito-user-1', '2024-10-22 15:00:00', '/images/wushu.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 10, 'Wushu');

INSERT INTO event_attendees(event_id, cognito_user_id)
    VALUES (1, 'user456');

