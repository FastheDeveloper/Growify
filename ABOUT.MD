Sure, here's a markdown document tailored to your request.

## GROWIFY: A Gamified Self-Improvement App

### Why I Chose This Project

I chose to build **GROWIFY**, a gamified self-improvement app, from the provided project options for a few key reasons. First, the project's core functionality—tracking habits, goals, and streaks—is a great way to demonstrate foundational mobile development skills within a short timeframe. It allows me to focus on creating a beautiful, intuitive user interface and a smooth user experience.

Second, the nature of the project lends itself well to a "local-first" approach. By initially implementing the core features using a **local database**, I can build a functional, core application without needing to invest significant time in setting up a complex backend. This focus on core features and local functionality, with the possibility of later scaling to a full backend, is an ideal fit for a 3-day coding challenge.

---

### Features & Functionality

GROWIFY is designed to motivate users through a simple but effective points-based gamification system. Upon signing up, users are immediately rewarded, encouraging them to get started.

Here's a breakdown of the key features:

- **User Authentication**: Users can sign up and log in securely. Upon successful sign-up, each user receives an initial reward of **300 points**.
- **Goal Creation**: Users can create their own goals, set a priority level (e.g., high, medium, low), and define a completion target.
- **Streaks & Rewards**:
  - **Daily Streaks**: For each consecutive day a user maintains their streak, they are rewarded with **5 points**.
  - **Goal Completion**: Successfully completing a goal earns the user **10 points**.
- **Goal Management**: Users can easily mark goals as "done" and claim their reward, which is then added to their total points.

---

### Stack & Tools

The app is built using a modern and efficient technology stack, chosen to maximize development speed and create a high-quality product.

- **Expo React Native**: This framework allows for rapid development by providing a streamlined setup and access to powerful APIs, making it the perfect choice for a time-constrained project.
- **TypeScript**: Using TypeScript ensures code quality and maintainability by providing static typing, which helps catch errors early in the development process.
- **Supabase**: Supabase handles the user authentication. Its straightforward setup and robust features make it an excellent choice for quickly implementing secure sign-in functionality.
- **Secure Storage**: Secure storage is used to safely store user data, ensuring sensitive information is protected on the device.
- **Tailwind CSS**: Tailwind enables rapid UI development with its utility-first approach. It makes it easy to create a clean, aesthetically pleasing interface without having to write custom CSS.

---

### Scaling & Future Development

While the current version of GROWIFY focuses on a local-first approach, the project is designed with scalability in mind. The long-term vision includes transitioning to a dedicated backend system to unlock more advanced features and a richer user experience.

#### **Backend & Data Management**

- **Dedicated Backend**: Creating a dedicated backend would allow for more efficient data storage and management. This would enable multiple users to log in on the same device without causing local storage conflicts, providing a more robust and flexible user experience.

#### **Enhanced Goal Engagement**

- **Interactive Goal Screens**: The app would evolve from a simple goal tracker to an active engagement platform. For example, a user with a "meditation" goal could open a dedicated meditation screen that plays guided mindfulness tracks. Similarly, a "reading" goal could provide a list of curated e-books, and a "running" goal could integrate a step tracker. This approach ensures users are actively engaging with their goals, not just ticking them off.

#### **Community & Social Features**

- **Community Hub**: A key feature would be a community screen where users can connect with others who share similar goals. This fosters a sense of competition and mutual motivation, making the self-improvement journey more social and engaging.

#### **Gamification & Rewards**

- **In-App Store**: The points earned by users could be used in an in-app store to redeem fun, unique, and virtual items like custom app themes, avatar accessories, or exclusive guided content. This deepens the gamified aspect and provides a tangible reward for their hard work.
