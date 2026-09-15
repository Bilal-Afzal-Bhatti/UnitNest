// src/constants/typography.ts
export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

export const typography = {
  appTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 23, // 22–24 px range
  },
  screenTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 21, // 20–22 px range
  },
  input: {
    fontFamily: fonts.medium,
    fontSize: 34, // 32–36 px range
  },
  conversionResult: {
    fontFamily: fonts.bold,
    fontSize: 36, // 32–40 px range
  },
  categoryTitle: {
    fontFamily: fonts.medium,
    fontSize: 15.5, // 15–16 px range
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15, // 14–16 px range
  },
  supportingText: {
    fontFamily: fonts.regular,
    fontSize: 13, // 12–14 px range
  },
};