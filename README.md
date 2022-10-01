# 🏋️ PulluP Fitness

## 📝 Overview

I built this app after having realized that my good ol' iOS
Notes app no longer provided me with the user experience to exercise
efficiently at the gym. PulluP Fitness is a web app for those who
wish to track their fitness progression! This full-stack project
includes the following features:
<br />
<ul>
<li>Passwordless sign-in as an authenticated user with NextAuth.</li>
<li>Query a live database in order to create, update, and modify exercise stats such as weight, repetitions, and number of sets.</li>
<li>Curate diverse workouts across several muscle groups.</li>
<li>Set consecutive timers for timed workouts such as abs.</li>
<li>Plus more to come!</li>
</ui>
<br />

🖇 [PulluP Fitness](https://pullup.at)

<p align="center">
  <img src="https://user-images.githubusercontent.com/90011911/193400063-de4e9922-ed07-4801-bd8f-f1a3ed9742aa.png" alt="auth" />
  <img src="https://user-images.githubusercontent.com/90011911/193400064-334c323d-0214-49c7-9bcc-514c864029e2.png" alt="stats" />
  <img src="https://user-images.githubusercontent.com/90011911/193400062-9a8fa115-bba7-4b1d-9007-33ba89ceb5cd.png" alt="workout" />
  <img src="https://user-images.githubusercontent.com/90011911/193400060-4ee9d511-eaf2-440d-9f17-324ac50a68c6.png" alt="timer" />
</p>

## ⌨️ Tech

- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
  - Next.js API routes - serverless functions for consuming API
- [NextAuth](https://next-auth.js.org/) - passwordless authentication
- [Amazon RDS](https://aws.amazon.com/rds/) + PostgreSQL - database hosting
- [React-Query](https://tanstack.com/query/v4/) - server-side data fetching, server-side state, caching
- [Zustand](https://github.com/pmndrs/zustand) - client-side state
- [Prisma](https://www.prisma.io/) - ORM for db access & migrations
- [react-hook-form](https://react-hook-form.com/) + [Zod](https://github.com/colinhacks/zod) - form validation
- Fetch API + Axios - HTTP requests
- [Mantine](https://mantine.dev/) - for specific react components (Table, Modal, Select, etc.)
- [Tabler](https://tablericons.com/) - icons
- [Vercel](https://vercel.com/) - application deployment

## 🤯 Things I Learned

<li>
  Integrating an interactive & dynamic table was much harder than
  I thought. Creating the skeleton wasn’t too difficult (add a
  button that, when triggered, transforms table data fields to
  text input). The difficult part was figuring out how to combine
  it with complex state, form validation, db queries, and
  re-rendering.
</li>
<li>
  I also ran into lots of state management and prop drilling
  issues. Took a break and spent some time studying different ways
  of managing state, client vs server state, global vs local
  state, etc. Ended up utilizing Zustand (client state) and React
  Query (server state).
</li>
<li>
  It seems trying to re-invent the wheel with anything security
  related is a big no-no. Fortunately, NextAuth exists! It made
  passwordless authentication very easy to implement.
</li>

## ✍️ Development Setup

```bash
# Clone repo
git clone https://github.com/avilldaniel/pullup-fitness.git

# Install dependencies
npm install

# Initiate server and visit `http://localhost:3000/`
npm run dev
```

## ⚙️ Meta

Daniel Villegas - [avilldaniel@gmail.com](avilldaniel@gmail.com)

Distributed under the MIT License. See `MIT License` for more information.

https://github.com/avilldaniel/pullup-fitness


## 🛠 Contributing
1. Fork this repo
2. Create your feature branch `git checkout -b <branch_name>`
3. Commit your changes `git commit -am "<commit_message>"`
4. Push to the branch `git push origin <project_name>/<location>`
5. Create a new Pull Request
