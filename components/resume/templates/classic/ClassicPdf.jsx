import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDateRange, getSkillItems } from "../shared/formatters";
import { CustomSectionsPdf } from "../shared/CustomSectionsPdf";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", lineHeight: 1.4 },
  header: { textAlign: "center", marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  contact: { color: "#444", fontSize: 9 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", marginTop: 10, marginBottom: 4, textTransform: "uppercase" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bold: { fontWeight: "bold" },
  bullet: { marginLeft: 10, marginBottom: 2 },
  muted: { color: "#555", fontSize: 9 },
});

export default function ClassicPdf({ data }) {
  const { contact, summary, experience, education, skills, projects, certifications, customSections } =
    data || {};
  const skillItems = getSkillItems(skills);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {contact?.name ? <Text style={styles.name}>{contact.name}</Text> : null}
          <Text style={styles.contact}>
            {[contact?.email, contact?.phone, contact?.location].filter(Boolean).join(" · ")}
          </Text>
        </View>

        {summary ? (
          <View>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text>{summary}</Text>
          </View>
        ) : null}

        {experience?.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>
                    {[exp.title, exp.company].filter(Boolean).join(" — ")}
                  </Text>
                  <Text style={styles.muted}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </Text>
                </View>
                {(exp.bullets || []).filter(Boolean).map((b, bi) => (
                  <Text key={bi} style={styles.bullet}>
                    • {b}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {education?.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <Text key={i} style={{ marginBottom: 4 }}>
                {[edu.degree, edu.field, edu.school].filter(Boolean).join(", ")}
              </Text>
            ))}
          </View>
        ) : null}

        {skillItems.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text>{skillItems.join(" · ")}</Text>
          </View>
        ) : null}

        {projects?.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={styles.bold}>{p.name}</Text>
                {(p.bullets || []).filter(Boolean).map((b, bi) => (
                  <Text key={bi} style={styles.bullet}>
                    • {b}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {certifications?.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((c, i) => (
              <Text key={i}>{[c.name, c.issuer, c.date].filter(Boolean).join(" — ")}</Text>
            ))}
          </View>
        ) : null}

        <CustomSectionsPdf
          sections={customSections}
          sectionTitleStyle={styles.sectionTitle}
          bulletStyle={styles.bullet}
        />
      </Page>
    </Document>
  );
}
