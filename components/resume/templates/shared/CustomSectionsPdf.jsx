import { Text, View } from "@react-pdf/renderer";

export function CustomSectionsPdf({ sections, sectionTitleStyle, bulletStyle }) {
  if (!sections?.length) return null;

  return sections.map((sec) => {
    const bullets = (sec.bullets || []).filter(Boolean);
    const title = (sec.title || "").trim();
    if (!title && !bullets.length) return null;

    return (
      <View key={sec.id}>
        <Text style={sectionTitleStyle}>{title || "Additional"}</Text>
        {bullets.map((b, i) => (
          <Text key={i} style={bulletStyle}>
            • {b}
          </Text>
        ))}
      </View>
    );
  });
}
