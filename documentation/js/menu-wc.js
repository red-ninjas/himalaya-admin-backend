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
                    <a href="index.html" data-type="index-link">@himalaya/dashboard-nest documentation</a>
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
                                <a href="modules/AuthSeedingModule.html" data-type="entity-link" >AuthSeedingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthSeedingModule-f3d2aa632b85f5f551a3ee1f3e9cc881947949f2bf3f558a75479cb794d7a8b96a7c506b5b129cef94eff302f097b7146f6f2f9fac0de3bea8bce3c2e6ce9ddf"' : 'data-bs-target="#xs-injectables-links-module-AuthSeedingModule-f3d2aa632b85f5f551a3ee1f3e9cc881947949f2bf3f558a75479cb794d7a8b96a7c506b5b129cef94eff302f097b7146f6f2f9fac0de3bea8bce3c2e6ce9ddf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthSeedingModule-f3d2aa632b85f5f551a3ee1f3e9cc881947949f2bf3f558a75479cb794d7a8b96a7c506b5b129cef94eff302f097b7146f6f2f9fac0de3bea8bce3c2e6ce9ddf"' :
                                        'id="xs-injectables-links-module-AuthSeedingModule-f3d2aa632b85f5f551a3ee1f3e9cc881947949f2bf3f558a75479cb794d7a8b96a7c506b5b129cef94eff302f097b7146f6f2f9fac0de3bea8bce3c2e6ce9ddf"' }>
                                        <li class="link">
                                            <a href="injectables/AuthSeedingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthSeedingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QueryModule.html" data-type="entity-link" >QueryModule</a>
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
                                    <a href="controllers/QueryController.html" data-type="entity-link" >QueryController</a>
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
                                    <a href="entities/AccessTokenEntity.html" data-type="entity-link" >AccessTokenEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ClientEntity.html" data-type="entity-link" >ClientEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ClientRolesEntity.html" data-type="entity-link" >ClientRolesEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PermissionEntity.html" data-type="entity-link" >PermissionEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PermissionGroupEntity.html" data-type="entity-link" >PermissionGroupEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RoleEntity.html" data-type="entity-link" >RoleEntity</a>
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
                                <a href="classes/ClientCreatedEvent.html" data-type="entity-link" >ClientCreatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientCredentialsStrategy.html" data-type="entity-link" >ClientCredentialsStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientEntity.html" data-type="entity-link" >ClientEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientNotFoundException.html" data-type="entity-link" >ClientNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientPayload.html" data-type="entity-link" >ClientPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientRolesEntity.html" data-type="entity-link" >ClientRolesEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ComplexQueryRequest.html" data-type="entity-link" >ComplexQueryRequest</a>
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
                                <a href="classes/FilterableRequest.html" data-type="entity-link" >FilterableRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidUserException.html" data-type="entity-link" >InvalidUserException</a>
                            </li>
                            <li class="link">
                                <a href="classes/OAuth2Request.html" data-type="entity-link" >OAuth2Request</a>
                            </li>
                            <li class="link">
                                <a href="classes/OAuth2Response.html" data-type="entity-link" >OAuth2Response</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationMeta.html" data-type="entity-link" >PaginationMeta</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordStrategy.html" data-type="entity-link" >PasswordStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryPaginationResource.html" data-type="entity-link" >QueryPaginationResource</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenStrategy.html" data-type="entity-link" >RefreshTokenStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimpleQueryRequest.html" data-type="entity-link" >SimpleQueryRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortableRequest.html" data-type="entity-link" >SortableRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/System1705059848171.html" data-type="entity-link" >System1705059848171</a>
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
                                    <a href="injectables/AuthSeedingService.html" data-type="entity-link" >AuthSeedingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientRepository.html" data-type="entity-link" >ClientRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Oauth2GrantStrategyRegistry.html" data-type="entity-link" >Oauth2GrantStrategyRegistry</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QueryService.html" data-type="entity-link" >QueryService</a>
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
                                <a href="guards/EntityAccessorGuard.html" data-type="entity-link" >EntityAccessorGuard</a>
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
                                <a href="interfaces/ClientRepositoryInterface.html" data-type="entity-link" >ClientRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEntityAccessorOptions.html" data-type="entity-link" >IEntityAccessorOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITypeOrmAddionalFields.html" data-type="entity-link" >ITypeOrmAddionalFields</a>
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
                                <a href="interfaces/PaginationMetaParameters.html" data-type="entity-link" >PaginationMetaParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueryOptions.html" data-type="entity-link" >QueryOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceDictonary.html" data-type="entity-link" >ResourceDictonary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link" >UserInterface</a>
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