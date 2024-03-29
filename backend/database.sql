-- 1

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE ForumUsers (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	name VARCHAR ( 50 ) UNIQUE NOT NULL,
	date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
	id serial PRIMARY KEY,
	category VARCHAR ( 50 ) UNIQUE NOT NULL
);

CREATE TABLE Posts (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	poster uuid NOT NULL,
	category serial NOT NULL,
	date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	date_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_poster FOREIGN KEY (poster) REFERENCES ForumUsers (id) ON DELETE SET NULL,
	CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES Categories (id) ON DELETE SET NULL,
	title TEXT NOT NULL
);

CREATE TABLE Comments (
	id serial PRIMARY KEY,
	commenter uuid NOT NULL,
	post uuid NOT NULL,
	comment TEXT NOT NULL,
	date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_commenter FOREIGN KEY (commenter) REFERENCES ForumUsers (id) ON DELETE SET NULL,
	CONSTRAINT fk_post FOREIGN KEY (post) REFERENCES Posts (id) ON DELETE CASCADE
);

--

ALTER TABLE posts ADD description TEXT;
ALTER TABLE posts ALTER COLUMN description SET NOT NULL;

ALTER TABLE forumusers ADD password TEXT;
ALTER TABLE forumusers ALTER COLUMN password SET NOT NULL;