import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre Mim</Text>
      <View style={styles.content}>
        <Text style={styles.info}>
          <Text style={styles.label}>Nome:</Text> Murilo
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Email:</Text> 199121@upf.br
        </Text>
        <Text style={styles.description}>
          Meu nome é Murilo, tenho 19 anos e sou estudante de Ciência da
          Computação na Universidade de Passo Fundo, atualmente curso o quarto
          nível da graduação. Além disso, atuo como Desenvolvedor de Sistemas
          Júnior na Congregação de Nossa Senhora - Notre Dame, onde contribuo
          para o desenvolvimento de projetos.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1e1e1e",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#929394",
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    backgroundColor: "#2d2d2d",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  info: {
    color: "#d1d1d1",
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 20,
    color: "#b0b0b0",
  },
});

export default About;
