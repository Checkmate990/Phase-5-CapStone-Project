/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      xsss: "320px",
      xs: "375px",
      xss: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1800px",
    },
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      fontSize: {
        "heading-one": "90px",
        "heading-two": "70px",
        "heading-seven": "50px",

        "heading-three": "34px",
        "heading-banner": "45px",
        "heading-four": "24px",
        "heading-five": "30px",
        "heading-six": "19px",
        "head-line": "15px",
        "head-ing": "12px",
        "head-s": "10px",
        "head-xss": "8px",
        "paragraph-one": "24px",
        "paragraph-two": "19px",
        "paragraph-three": "35px",
      },
      colors: {
        menu: "#004C79",
        primary: "#032B51",
        secondary: "#036CB9",
        nav: "#001B34",
        footer: "#011324",
        blue: "#0185EB",
        linear: "#003F6E",
        dark: "#00599E",
        green: "#009FFF",
        bg: "#000F2F",
        feild: "#000B15",
        card: "#00284E",
      },
    },
  },
  plugins: [],
};
