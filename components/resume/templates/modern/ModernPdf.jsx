import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDateRange, getSkillItems } from "../shared/formatters";
import { CustomSectionsPdf } from "../shared/CustomSectionsPdf";

const styles = StyleSheet.create({
  page: { fontSize: 10, fontFamily: "Helvetica", lineHeight: 1.35 },
  header: { backgroundColor: "#1e293b", color: "#fff", padding: 24, marginBottom: 16 },
  name: { fontSize: 20, marginBottom: 6 },
  headerMeta: { fontSize: 9, color: "#cbd5e1" },
  body: { paddingHorizontal: 32, paddingBottom: 32 },
  sectionTitle: { fontSize: 11, fontWeight: "bold", marginBottom: 6, color: "#1e293b", borderBottomWidth: 2, borderBottomColor: "#1e293b", paddingBottom: 2 },
  bold: { fontWeight: "bold" },
  muted: { color: "#555", fontSize: 9 },
  bullet: { marginLeft: 8, marginBottom: 2 },
  skillTag: { backgroundColor: "#f1f5f9", padding: "2 6", marginRight: 4, marginBottom: 4, fontSize: 8 },
  skillRow: { flexDirection: "row", flexWrap: "wrap" },
});

export default function ModernPdf({ data }) {
  const { contact, summary, experience, education, skills, projects, certifications, customSections } =
    data || {};
  const skillItems = getSkillItems(skills);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {contact?.name ? <Text style={styles.name}>{contact.name}</Text> : null}
          <Text style={styles.headerMeta}>
            {[contact?.email, contact?.phone, contact?.location].filter(Boolean).join("  ·  ")}
          </Text>
        </View>

        <View style={styles.body}>
          {summary ? (
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text>{summary}</Text>
            </View>
          ) : null}

          {experience?.length > 0 ? (
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.bold}>{exp.title}</Text>
                    <Text style={styles.muted}>
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </Text>
                  </View>
                  <Text style={styles.muted}>{exp.company}</Text>
                  {(exp.bullets || []).filter(Boolean).map((b, bi) => (
                    <Text key={bi} style={styles.bullet}>
                      ▸ {b}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {skillItems.length > 0 ? (
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillRow}>
                {skillItems.map((s, i) => (
                  <Text key={i} style={styles.skillTag}>
                    {s}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}

          {education?.length > 0 ? (
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <Text style={styles.bold}>{edu.school}</Text>
                  <Text style={styles.muted}>{edu.degree}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {projects?.length > 0 ? (
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((p, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <Text style={styles.bold}>{p.name}</Text>
                  {(p.bullets || []).filter(Boolean).map((b, bi) => (
                    <Text key={bi} style={styles.bullet}>
                      {b}
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
                <Text key={i}>{c.name}</Text>
              ))}
            </View>
          ) : null}

          <CustomSectionsPdf
            sections={customSections}
            sectionTitleStyle={styles.sectionTitle}
            bulletStyle={styles.bullet}
          />
        </View>
      </Page>
    </Document>
  );
}
