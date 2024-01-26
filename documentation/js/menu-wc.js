'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@himalaya/admin-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CliModule.html" data-type="entity-link" >CliModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CrudModule.html" data-type="entity-link" >CrudModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/JwtAuthModule.html" data-type="entity-link" >JwtAuthModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/Oauth2Controller.html" data-type="entity-link" >Oauth2Controller</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TokenController.html" data-type="entity-link" >TokenController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/AuthJwtTokenEntity.html" data-type="entity-link" >AuthJwtTokenEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AuthPermissionEntity.html" data-type="entity-link" >AuthPermissionEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AuthPermissionGroupEntity.html" data-type="entity-link" >AuthPermissionGroupEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AuthRoleAssignmentEntity.html" data-type="entity-link" >AuthRoleAssignmentEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AuthRoleEntity.html" data-type="entity-link" >AuthRoleEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Oauth2AccessTokenEntity.html" data-type="entity-link" >Oauth2AccessTokenEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Oauth2ClientEntity.html" data-type="entity-link" >Oauth2ClientEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccessTokenCreatedEvent.html" data-type="entity-link" >AccessTokenCreatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccessTokenNotFoundException.html" data-type="entity-link" >AccessTokenNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthJwtTokenResponse.html" data-type="entity-link" >AuthJwtTokenResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthLoginTokenResponse.html" data-type="entity-link" >AuthLoginTokenResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthRoleAssignmentEntity.html" data-type="entity-link" >AuthRoleAssignmentEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientCreatedEvent.html" data-type="entity-link" >ClientCreatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientCredentialsStrategy.html" data-type="entity-link" >ClientCredentialsStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientNotFoundException.html" data-type="entity-link" >ClientNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientPayload.html" data-type="entity-link" >ClientPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAccessTokenCommand.html" data-type="entity-link" >CreateAccessTokenCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAccessTokenHandler.html" data-type="entity-link" >CreateAccessTokenHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateClientCommand.html" data-type="entity-link" >CreateClientCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateClientHandler.html" data-type="entity-link" >CreateClientHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSystemPermissionCommand.html" data-type="entity-link" >CreateSystemPermissionCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSystemPermissionHandler.html" data-type="entity-link" >CreateSystemPermissionHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSystemPermissionsCli.html" data-type="entity-link" >CreateSystemPermissionsCli</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCli.html" data-type="entity-link" >CreateUserCli</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCommand.html" data-type="entity-link" >CreateUserCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserHandle.html" data-type="entity-link" >CreateUserHandle</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudFilterableRequest.html" data-type="entity-link" >CrudFilterableRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudPaginationMeta.html" data-type="entity-link" >CrudPaginationMeta</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudPaginationRequest.html" data-type="entity-link" >CrudPaginationRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudPaginationResource.html" data-type="entity-link" >CrudPaginationResource</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudSettingsStorage.html" data-type="entity-link" >CrudSettingsStorage</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudSortableRequest.html" data-type="entity-link" >CrudSortableRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudTransformPaginationInterceptor.html" data-type="entity-link" >CrudTransformPaginationInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudTransformSingleInterceptor.html" data-type="entity-link" >CrudTransformSingleInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidUserException.html" data-type="entity-link" >InvalidUserException</a>
                            </li>
                            <li class="link">
                                <a href="classes/Oauth2ClientEntity.html" data-type="entity-link" >Oauth2ClientEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/OAuth2Request.html" data-type="entity-link" >OAuth2Request</a>
                            </li>
                            <li class="link">
                                <a href="classes/OAuth2Response.html" data-type="entity-link" >OAuth2Response</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordStrategy.html" data-type="entity-link" >PasswordStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenStrategy.html" data-type="entity-link" >RefreshTokenStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetupCli.html" data-type="entity-link" >SetupCli</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenResponse.html" data-type="entity-link" >TokenResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserClass.html" data-type="entity-link" >UserClass</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPayload.html" data-type="entity-link" >UserPayload</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessTokenRepository.html" data-type="entity-link" >AccessTokenRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" >AccessTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminLoader.html" data-type="entity-link" >AdminLoader</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthTasksService.html" data-type="entity-link" >AuthTasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientRepository.html" data-type="entity-link" >ClientRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Oauth2GrantStrategyRegistry.html" data-type="entity-link" >Oauth2GrantStrategyRegistry</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrategyExplorer.html" data-type="entity-link" >StrategyExplorer</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/CrudEntityDetectionGuard.html" data-type="entity-link" >CrudEntityDetectionGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CrudSearchRequestFiltersGuard.html" data-type="entity-link" >CrudSearchRequestFiltersGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CrudSearchRequestSortablesGuard.html" data-type="entity-link" >CrudSearchRequestSortablesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/JwtTokenGuard.html" data-type="entity-link" >JwtTokenGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccessTokenRepositoryInterface.html" data-type="entity-link" >AccessTokenRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminConfig.html" data-type="entity-link" >AdminConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicCommandOptions.html" data-type="entity-link" >BasicCommandOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClientRepositoryInterface.html" data-type="entity-link" >ClientRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICrudPaginationMetaParameters.html" data-type="entity-link" >ICrudPaginationMetaParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICrudSearchRequestOptions.html" data-type="entity-link" >ICrudSearchRequestOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueryController.html" data-type="entity-link" >IQueryController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Oauth2GrantStrategyInterface.html" data-type="entity-link" >Oauth2GrantStrategyInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Oauth2OptionsFactoryInterface.html" data-type="entity-link" >Oauth2OptionsFactoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Oauth2PayloadInterface.html" data-type="entity-link" >Oauth2PayloadInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Oauth2StrategyOptions.html" data-type="entity-link" >Oauth2StrategyOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueryDictionary.html" data-type="entity-link" >QueryDictionary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueryModuleOptions.html" data-type="entity-link" >QueryModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueryOptions.html" data-type="entity-link" >QueryOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceDictonary.html" data-type="entity-link" >ResourceDictonary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SystemAdminInterface.html" data-type="entity-link" >SystemAdminInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserClassPayload.html" data-type="entity-link" >UserClassPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserLoaderInterface.html" data-type="entity-link" >UserLoaderInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserValidatorInterface.html" data-type="entity-link" >UserValidatorInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});