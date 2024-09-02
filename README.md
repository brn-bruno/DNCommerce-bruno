DNCommerce é uma loja online que vende produtos de beleza.
Neste projeto apenas foi solicitado apenas estruturar o back-end e modelar o banco de dados da aplicação. Para isso foi utilizado NodeJS junto com algumas bibliotecas, as principais foram Express.js e MySQL2. O banco de dados utilizado foi o MySQL.

**Diagrama Lógico:**
![Logico_DNCommerce](https://github.com/user-attachments/assets/94e1f72a-117c-4bed-bbc3-f5ce3995086c)

Alguns dos testes de requisições feitas pelo Insomnia à API:

**Consultar Produtos:**
![image](https://github.com/user-attachments/assets/5e186f33-eaf1-485f-b2fe-fafce3bdf241)

**Cadastrar Produtos:**
![image](https://github.com/user-attachments/assets/87277ae8-68e8-435d-aedb-c7f0cde4d44d)

**Alterar Produto:**
![image](https://github.com/user-attachments/assets/f3af0ada-f0f9-4291-bdba-af0aecfc39bf)

**Consultar Vendas:**
![image](https://github.com/user-attachments/assets/de498728-de24-4814-9d1f-481559194c2d)

**Consultar Vendas pelo ID:**
![image](https://github.com/user-attachments/assets/98c5e280-82da-46d0-b422-d9645e5358d4)

**Cadastrar vendas:**
![image](https://github.com/user-attachments/assets/4087becd-83ba-4869-9a44-0d7404e8e402)

Como a aplicação faz o controle de estoque, todas as vezes que é realizada uma compra a quantidade comprada é subtraída da quantidade disponível no estoque.
<br/>De forma semelhante são feitas algumas validações para que, por exemplo, não sejam efetivadas compras de produtos que não tenham mais estoque disponível:
![image](https://github.com/user-attachments/assets/1d8679cc-5422-4d0a-b628-16da8d0bdd28)

