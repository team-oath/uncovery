#Privy
##Initial Setup

1. **Clone Repository**
    `git clone git@github.com:team-oath/uncovery.git`
2. **Install Dependencies**
    `npm install`
3. **Database Setup**
    `mysql -u root < server/db/schema.sql`
4. **Run Tests**
    `grunt test`

## How to contribute to Privy

* Before you open a ticket or send a pull request, [search](https://github.com/team-oath/uncovery/issues) for previous discussions about the same feature or issue. Add to the earlier ticket if you find one.

* Before sending a pull request for a feature, be sure to have [tests](https://github.com/team-oath/uncovery/tree/master/specs).

* Use the same coding style as the rest of the codebase.
  * All strings in single quotes
  * Use ES6 builtin Promise library for all asynchronous calls
  * No [spaghetti code](http://en.wikipedia.org/wiki/Spaghetti_code). All code
  * must be: 
    1. Modular
    2. Readable
    3. Reuseable
  * Automate as much as possible using Grunt. 
