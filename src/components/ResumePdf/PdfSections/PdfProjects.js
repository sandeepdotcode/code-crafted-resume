import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

const styles = StyleSheet.create({
  projectHeader: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 700,
  },
  linksLine: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    gap: 10,
    marginBottom: 10,
  },
  linkItem: {
    display: 'flex',
    flexDirection: 'row',
  },
});

function Project({ project }) {
  const bullets = project.bullets.map((bullet) => (<Bullet bullet={bullet} key={bullet.id} />));

  return (
    <>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{ project.name } </Text>
        <Text>- { project.tech }</Text>
      </View>
      <View style={commonStyles.bulletBlock}>{ bullets }</View>
      <View style={styles.linksLine}>
        <View style={styles.linkItem}>
          <Text>Code: </Text>
          <Link src={project.code.link}><Text style={commonStyles.link}>{ project.code.text }</Text></Link>
        </View>
        <View style={styles.linkItem}>
          <Text>Demo: </Text>
          <Link src={project.demo.link}><Text style={commonStyles.link}>{ project.demo.text }</Text></Link>
        </View>
      </View>
    </>
  );
}

function PdfProjects({ projectsArray }) {
  const projects = projectsArray.map((project, index) => (<Project project={project} key={index} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>PROJECTS</Text></View>
      { projects }
    </View>
  );
}

export default PdfProjects;
