# MY RESUME
## PROJETO MEU CURRÍCULO

### Construção
   Uma aplicação que traz um pequeno e singelo sistema que mostra uma página inicial informando alguns dados do usuário, como nome, data de nascimento e algumas redes sociais. Mas como o objetivo é mostrar um currículo, uma segunda página foi criada para que possa, se necessário, imprimir/visualizar um arquivo bem simples com dados incluidos por meio do servidor.
   Os dados do usuário foram construidos usando um simples objeto javascript(__myResume-model.js__) que é exportado para o controlador(__index-controller.js__), no entanto, uma implementação com um serviço de banco de dados, possuindo os dados desse usuário, pode ser implementado de forma simples. Apenas é necessário substituir o objeto(__myResume-model.js__) para uma conexão com um serviço de dados.

### Código
   A Construção do código foi feita de forma que o servidor usando um protocolo __HTTP__ juntamente com a framework __express__ seja inciado, e ofereça duas rotas para o __client-side__ que irá renderizar páginas html contendo os tais dados do currículo. Essas páginas são feitas usando uma framework de template engine(__ejs__). Assim as duas rotas podem ser alimentadas com os dados.
   Existem outras frameworks trabalhando na aplicação, como o __path__, __body-parser__ e outros, além da __ejs__. 

### Conclusão
   A construção dessa aplicação foi feita para fins educacionais, mas percebo que pode ser usada como uma forma de demonstração rápida e com um fácil acesso via internet de um currículo que pode vir em mãos de forma simples e de qualquer lugar.
   Currículos impressos não são muito utilizados hoje, principalmente em grandes empresas, que vem até aos candidatos por meio de redes sociais como o [Linkedin](https://www.linkedin.com/), ou agências de trabalho. No entanto, as empresas ainda aceitam currículos impressos. além de ser muito difícil desse geito bem tradicional se perder tão rápido.
   Porem uma página que demonstre seu currículo construida ou implementada por você é bem interessante e pode contar muito seja em qualquer área que você trabalhe.