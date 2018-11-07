# AAD Authentication With Implicit Flow

[coderuse.github.io/aad-implicit-flow/](https://coderuse.github.io/aad-implicit-flow/){:target="_blank"}

### Overview

This is an over-simplified implementation of acquiring [access token](https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens) [authenticating](https://docs.microsoft.com/en-us/azure/active-directory/develop/authentication-scenarios) [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis) with implicit flow defined in [Rfc-6749](https://tools.ietf.org/html/rfc6749#section-4.2).

### Background

AAD offers two versions of API. There are very little difference between the processes to authenticate with [version 1](https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-oauth2-implicit-grant-flow) [version 2](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) with implicit flow. With the newer version `scope` to be used as parameter instead of `resource` and only fully qualified permissions are accepted instead of generic [app id uri](https://docs.microsoft.com/en-us/azure/app-service/app-service-mobile-how-to-configure-active-directory-authentication#a-nameregister-aregister-your-app-service-app-with-azure-active-directory). So, with latest one for example `app-id-uri/user_impersonation` to be used instead of `app-id-uri`. `user_impersonation` is the default permission created automatically while creating the app. This app is intended for acquiring access token from AAD. 

### How To Use

Tenant name, app id and required app permissions are needed to be filled in the [page](https://coderuse.github.io/aad-implicit-flow/). `id_token token` is used as response type to acquire access token with a single redirection. The acquired access token will be shown in the text-box. On a single click on the box, the token will be copied to clipboard for convenience.

### License

All the code presented are licensed, unless otherwise notified/stated, under [Apache-2.0](./LICENSE),

```
Copyright 2018 Arnab Das <arnab@coderuse.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

All the documents, tutorials here are licensed, unless otherwise notified/stated, under [GNU Free Documentation License](https://www.gnu.org/licenses/fdl-1.3.en.html)

```
Copyright (C)  2018 to present  Arnab Das <arnab@coderuse.com>.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
```
and [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/)