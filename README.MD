# Welcome to our Himalaya NestJS Crud System 👋

![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)
![NestJS](https://img.shields.io/badge/nest-%3E%3D10.2.1-green.svg)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/red-ninjas/himalaya-admin-backend/graphs/commit-activity)
[![License](https://img.shields.io/github/license/red-ninjas/himalaya-ui)](https://github.com/red-ninjas/himalaya-admin-backend/blob/master/LICENSE)

### 🏠 [Homepage](https://himalaya-ui.com)
## Prerequisites

- NestJS >= 10.2.1

## Installation

Choose your preferred package manager to install Himalaya UI:

```sh
yarn add @himalaya/admin-backend
```
```sh
npm install @himalaya/admin-backend
```

## Run Tests

You can run tests using the following command:

```sh
yarn test
```

## Getting Started

Here's a simple example of how to use within your NesstJS application:

```jsx
@Controller({
  path: 'tokens',
  version: ['1'],
})
@AuthPermission()
export class TokenController {
  constructor(
    @InjectRepository(TokenEntity)
    protected repository: Repository<TokenEntity>,
  ) {}

  @Post('collection')
  @CrudSearchRequest({
    entity: AuthJwtTokenEntity,
    output: AuthJwtTokenResponse,
    sortable: { accessToken: true },
    filterable: { accessToken: true, identifier: true },
  })
  public async getCollectionPost(
    @Body() options: CrudPaginationRequest,
  ): Promise<CrudPaginationResource<AuthJwtTokenEntity>> {
    return await crudPagination(AuthJwtTokenEntity, this.repository, options);
  }

  @Delete('item/:id')
  @CrudEntityRequest(AuthJwtTokenEntity, 'id')
  public async deleteRequest(@CrudEntity() record: AuthJwtTokenEntity) {
    await record.remove();
  }

  @Get('item/:id')
  @CrudEntityRequest(AuthJwtTokenEntity, 'id')
  @CrudTransformResponse(AuthJwtTokenEntity, AuthJwtTokenResponse)
  public async getRequest(@CrudEntity() record: AuthJwtTokenEntity) {
    return record;
  }
}

```

## Author

👤 **RedNinjas LTD**

* Website: https://redninjas.dev
* Github: [@red-ninjas](https://github.com/red-ninjas)

👤 **Stefan Kalysta**

* Github: [@kalysti](https://github.com/kalysti)

## 🤝 Contributing

We welcome contributions, issues, and feature requests from the community! Please visit our [issues page](https://github.com/red-ninjas/himalya-admin-backend/issues) to report problems or make suggestions. You can also find our [contributing guide](https://github.com/red-ninjas/himalya-admin-backend/blob/master/CONTRIBUTING.md) for more information.

## Show Your Support

If Himalaya UI has helped you in your projects, show your support by giving us a ⭐️!

## 📝 License

Himalaya UI is licensed under the MIT License. The MIT License is a permissive open source license that allows you to use, modify, and distribute the software for both commercial and non-commercial purposes. You are granted extensive freedom to customize and integrate Himalaya UI into your projects while maintaining the freedom to use it as you see fit.

Copyright © 2023 [RedNinjas LTD](https://github.com/red-ninjas).

For more details, please review the full [MIT License](https://github.com/red-ninjas/himalya-admin-backend/blob/master/LICENSE) provided by the project.
