module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      // todo model
      ResponseProducts: {
        type: "object", // data type
        properties: {
          message: {
            type: "string", // data-type
            description: "Mensagem de sucesso ou Erro", // desc
            example: "Operação realizada com sucesso",
          },
          docs: {
            type: "array", // data-type
            items: {
              $ref: "#/components/schemas/Products",
            },
            description: "Produtos", // desc
            example: [
              {
                _id: "63bc1f49511f998b8d0c5814",
                name: "Bolacha Nikito Recheada",
                priceCost: 1.5,
                priceSell: 2.5,
                description: "Bolacha Nikito Recheada",
                category: "Bolachas",
                realStock: 110,
                initialStock: 100,
                createdAt: "2023-01-09T14:06:01.421Z",
                __v: 0,
                moveStock: 10,
                updatedAt: "2023-01-09T15:03:55.998Z",
              },
            ], // example of a title
          },
          totalDocs: {
            type: "number", // data-type
            description: "Total de produtos", // desc
            example: 1, // example of a completed value
          },
          limit: {
            type: "number", // data-type
            description: "Limite de produtos", // desc
            example: 10, // example of a completed value
          },
          totalPages: {
            type: "number", // data-type
            description: "Total de páginas", // desc
            example: 1, // example of a completed value
          },
          page: {
            type: "number", // data-type
            description: "Página atual", // desc
            example: 1, // example of a completed value
          },
          pagingCounter: {
            type: "number", // data-type
            description: "Contador de páginas", // desc
            example: 1, // example of a completed value
          },
          hasPrevPage: {
            type: "boolean", // data-type
            description: "Possui página anterior", // desc
            example: false, // example of a completed value
          },
          hasNextPage: {
            type: "boolean", // data-type
            description: "Possui próxima página", // desc
            example: false, // example of a completed value
          },
          prevPage: {
            type: "number", // data-type
            description: "Página anterior", // desc
            example: 1, // example of a completed value
          },
          nextPage: {
            type: "number",
            description: "Proxima pagina",
            example: 1,
          },
        },
      },
      // Todo input model
      Products: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string", // data type
            description: "Id do produto", // desc
            example: "63bc1f49511f998b8d0c5814", // example of a title
          },
          name: {
            type: "string", // data type
            description: "Nome do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
          priceCost: {
            type: "number", // data type
            description: "Preço de custo do produto", // desc
            example: 1.5, // example of a completed value
          },
          priceSell: {
            type: "number", // data type
            description: "Preço de venda do produto", // desc
            example: 2.5, // example of a completed value
          },
          description: {
            type: "string", // data type
            description: "Descrição do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
          category: {
            type: "string", // data type
            description: "Categoria do produto", // desc
            example: "Bolachas", // example of a completed value
          },
          realStock: {
            type: "number", // data type
            description: "Estoque real do produto", // desc
            example: 110, // example of a completed value
          },
          initialStock: {
            type: "number", // data type
            description: "Estoque inicial do produto", // desc
            example: 100, // example of a completed value
          },
          createdAt: {
            type: "date", // data type
            description: "Data de criação do produto", // desc
            example: "2023-01-09T14:06:01.421Z", // example of a completed value
          },
          __v: {
            type: "number", // data type
            description: "Versão do produto", // desc
            example: 0, // example of a completed value
          },
          moveStock: {
            type: "number", // data type
            description: "Movimentação do estoque do produto", // desc
            example: 10, // example of a completed value
          },
          updatedAt: {
            type: "date", // data type
            description: "Data de atualização do produto", // desc
            example: "2023-01-09T15:03:55.998Z", // example of a completed value
          },
        },
      },
      createProductRequest: {
        type: "object", // data type
        properties: {
          name: {
            type: "string", // data type
            description: "Nome do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
          priceCost: {
            type: "number", // data type
            description: "Preço de custo do produto", // desc
            example: 1.5, // example of a completed value
          },
          priceSell: {
            type: "number", // data type
            description: "Preço de venda do produto", // desc
            example: 2.5, // example of a completed value
          },
          description: {
            type: "string", // data type
            description: "Descrição do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
          category: {
            type: "string", // data type
            description: "Categoria do produto", // desc
            example: "Bolachas", // example of a completed value
          },
          initialStock: {
            type: "number", // data type
            description: "Estoque inicial do produto", // desc
            example: 100, // example of a completed value
          },
        },
      },
      createProductRequest: {
        type: "object", // data type
        properties: {
          name: {
            type: "string", // data type
            description: "Nome do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
          priceCost: {
            type: "number", // data type
            description: "Preço de custo do produto", // desc
            example: 1.5, // example of a completed value
          },
          priceSell: {
            type: "number", // data type
            description: "Preço de venda do produto", // desc
            example: 2.5, // example of a completed value
          },
          description: {
            type: "string", // data type
            description: "Descrição do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
          patrimonyNumber: {
            type: "string", // data type
            description: "Numero de patrimonio", // desc
            example: 1, // example of a completed value
          },
          category: {
            type: "string", // data type
            description: "Categoria do produto", // desc
            example: "Bolachas", // example of a completed value
          },
          initialStock: {
            type: "number", // data type
            description: "Estoque inicial do produto", // desc
            example: 100, // example of a completed value
          },
        },
      },

      // update todo model
      updateProductRequest: {
        type: "object", // data type
        properties: {
          name: {
            type: "string", // data type
            description: "Nome do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
          priceCost: {
            type: "number", // data type
            description: "Preço de custo do produto", // desc
            example: 1.5, // example of a completed value
          },
          priceSell: {
            type: "number", // data type
            description: "Preço de venda do produto", // desc
            example: 2.5, // example of a completed value
          },
          description: {
            type: "string", // data type
            description: "Descrição do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
          category: {
            type: "string", // data type
            description: "Categoria do produto", // desc
            example: "Bolachas", // example of a completed value
          },
          moveStock: {
            type: "number", // data type
            description: "Movimentação do estoque do produto", // desc
            example: 10, // example of a completed value
          },
        },
      },

      // error model
      Error: {
        type: "object", //data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message", // desc
            example: "Not found", // example of an error message
          },
        },
      },
      filterProducts: {
        type: "object", // data type
        properties: {
          filter: {
            type: "string", // data type
            description: "Nome do produto", // desc
            example: "Bolacha Nikito Recheada", // example of a completed value
          },
        },
      },
      loginRequest: {
        type: "object", // data type
        properties: {
          email: {
            type: "string", // data type
            description: "Email do usuário", // desc
            example: "teste@teste.com.br", // example of a completed value
          },
          password: {
            type: "string", // data type
            description: "Senha do usuário", // desc
            example: "123456", // example of a completed value
          },
        },
      },
      loginResponse: {
        type: "object", // data type
        properties: {
          message: {
            type: "string", // data type
            description: "Mensagem de sucesso", // desc
            example: "Login realizado com sucesso", // example of a completed value
          },
          token: {
            type: "string", // data type
            description: "auth token", // desc
            example: "qieljrghsdilurghbosdiruvbdfs", // example of a completed value
          },
        },
      },
      createUserRequest: {
        type: "object", // data type
        properties: {
          name: {
            type: "string", // data type
            description: "Nome do usuário", // desc
            example: "João da Silva", // example of a completed value
          },
          email: {
            type: "string", // data type
            description: "Email do usuário", // desc
            example: "teste@teste.com.br", // example of a completed value
          },
          password: {
            type: "string", // data type
            description: "Senha do usuário", // desc
            example: "123456", // example of a completed value
          },
          role: {
            type: "string", // data type
            description: "Função do usuário", // desc
            example: "admin", // example of a completed value
          },
        },
      },
      createPDVRequest: {
        type: "object", // data type
        properties: {
          products: {
            type: "array", // data type
            description: "Produtos do PDV", // desc
            example: [
              {
                productID: "60e1c5b0b0b5a40015b5b0a1",
                quantity: 10,
              },
            ], // example of a completed value
          },
          totalSell: {
            type: "number", // data type
            description: "Total da venda", // desc
            example: 10, // example of a completed value
          },
          cpfClient: {
            type: "string", // data type
            description: "CPF do cliente", // desc
            example: "12345678910", // example of a completed value
          },
        },
      },
      genericResponse: {
        type: "object", // data type
        properties: {
          message: {
            type: "string", // data type
            description: "Mensagem de sucesso", // desc
            example: "Operação Realizada com sucesso", // example of a completed value
          },
        },
      },
      genericError: {
        type: "object", // data type
        properties: {
          message: {
            type: "string", // data type
            description: "Mensagem de erro", // desc
            example: "Generic Error", // example of a completed value
          },
        },
      },
      refreshTokenRequest: {
        type: "object", // data type
        properties: {
          refreshToken: {
            type: "string", // data type
            description: "Refresh token", // desc
            example: "qieljrghsdilurghbosdiruvbdfs", // example of a completed value
          },
        },
      },
      refreshTokenResponse: {
        type: "object", // data type
        properties: {
          message: {
            type: "string", // data type
            description: "Mensagem de sucesso", // desc
            example: "Refresh realizado com sucesso", // example of a completed value
          },
          accessToken: {
            type: "string", // data type
            description: "auth token", // desc
            example: "qieljrghsdilurghbosdiruvbdfs", // example of a completed value
          },
        },
      },
      authLoginRequest: {
        type: "object", // data type
        properties: {
          email: {
            type: "string", // data type
            description: "Email do usuário", // desc
            example: "[...]", // example of a completed value
          },
          password: {
            type: "string", // data type
            description: "Senha do usuário", // desc
            example: "[...]", // example of a completed value
          },
        },
      },
      authLoginResponse: {
        type: "object", // data type
        properties: {
          message: {
            type: "string", // data type
            description: "Mensagem de sucesso", // desc
            example: "Login realizado com sucesso", // example of a completed value
          },
          accessToken: {
            type: "string", // data type
            description: "auth token", // desc
            example: "qieljrghsdilurghbosdiruvbdfs", // example of a completed value
          },
          refreshToken: {
            type: "string", // data type
            description: "auth token", // desc
            example: "qieljrghsdilurghbosdiruvbdfs", // example of a completed value
          },
        },
      },
      updatePatrimonyRequest: {
        type: "object", // data type
        properties: {
          isActive: {
            type: "boolean", // data type
            description: "Status do patrimônio", // desc
            example: true, // example of a completed value
          },
          observation: {
            type: "string", // data type
            description: "Descrição do patrimônio", // desc
            example: "Patrimônio 1", // example of a completed value
          },
        },
      },
    },
  },
};
