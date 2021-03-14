import theme from "styled-theming";
export const backgroundColor = theme("mode", {
  light: "#fafafa",
  dark: "#222"
});
export const textColor = theme("mode", {
  light: "rgba(0, 0, 0, 0.65);",
  dark: "#fff !important"
});
