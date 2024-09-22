export async function loader() {
    const some_data = [
        {
          id: 1,
          name: "John Doe",
          age: 29,
          occupation: "Software Engineer",
          bio: "John is a passionate developer with 7 years of experience in full-stack development. He enjoys working on open-source projects and contributing to the tech community.",
          hobbies: ["Reading tech blogs", "Gaming", "Hiking"],
          location: "San Francisco, CA",
        },
        {
          id: 2,
          name: "Jane Smith",
          age: 34,
          occupation: "Graphic Designer",
          bio: "Jane has a keen eye for design and has been working with top brands to create impactful visual content. She specializes in UX/UI design and digital illustration.",
          hobbies: ["Sketching", "Photography", "Traveling the world"],
          location: "New York, NY",
        },
        {
          id: 3,
          name: "Mark Johnson",
          age: 42,
          occupation: "Project Manager",
          bio: "With over 15 years in the tech industry, Mark leads teams to success with his organizational skills and ability to meet deadlines under pressure.",
          hobbies: ["Cycling", "Cooking gourmet meals", "Investing in stocks"],
          location: "Austin, TX",
        },
        {
          id: 4,
          name: "Lucy Brown",
          age: 23,
          occupation: "Data Analyst",
          bio: "Lucy has recently completed her degree in Data Science and is now working with top companies to provide insights using big data.",
          hobbies: ["Painting", "Jogging", "Learning new programming languages"],
          location: "Chicago, IL",
        },
        {
          id: 5,
          name: "Emma Wilson",
          age: 37,
          occupation: "Teacher",
          bio: "Emma has been teaching for over 12 years and is known for making learning fun and engaging for her students. She is passionate about educational reform.",
          hobbies: ["Gardening", "Yoga", "Reading"],
          location: "Seattle, WA",
        },
      ]

    return some_data
}

