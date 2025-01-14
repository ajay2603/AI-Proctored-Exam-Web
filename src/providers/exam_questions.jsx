import { createContext, useState } from "react";

// Create Context
export const QuestionsContext = createContext();

// Provider Component
export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState(
    JSON.parse(`[
        {
            "id": "4c9842d5-7942-43a8-bb81-ced8979ca348",
            "examId": "56188b72-6faa-436e-8108-bcc35a3ed2d2",
            "answer": "b9a3d57e-1ad3-4bc3-a7e4-53c4eafa8a9f",
            "context": [
                {
                    "id": "402b550a-f07e-4d85-8031-9aae92bd62a6",
                    "questionId": "4c9842d5-7942-43a8-bb81-ced8979ca348",
                    "linePosition": 0,
                    "type": "text",
                    "url": null,
                    "text": "This is the question"
                },
                {
                    "id": "b5e8848f-559c-42eb-99f5-30bde2dfb946",
                    "questionId": "4c9842d5-7942-43a8-bb81-ced8979ca348",
                    "linePosition": 1,
                    "type": "image",
                    "url": "1JwhzObehwOWuc-2Af5llKwcuyV2js9tn",
                    "text": null
                }
            ],
            "options": [
                {
                    "id": "10ac6d53-d5e8-4d11-b06e-3c74d1b01693",
                    "questionId": "4c9842d5-7942-43a8-bb81-ced8979ca348",
                    "context": [
                        {
                            "id": "cf2850c0-3424-40d0-bf7d-4b9551ee5f99",
                            "optionId": "10ac6d53-d5e8-4d11-b06e-3c74d1b01693",
                            "type": "text",
                            "url": null,
                            "text": "Hello how are you",
                            "linePosition": 0
                        },
                        {
                            "id": "dd0b80a0-f687-4d9f-a505-e20d849ff5db",
                            "optionId": "10ac6d53-d5e8-4d11-b06e-3c74d1b01693",
                            "type": "image",
                            "url": "1brrU9Om0UM0G8gXDz9pG0tRTTi1pXAy1",
                            "text": null,
                            "linePosition": 1
                        }
                    ]
                },
                {
                    "id": "b9a3d57e-1ad3-4bc3-a7e4-53c4eafa8a9f",
                    "questionId": "4c9842d5-7942-43a8-bb81-ced8979ca348",
                    "context": [
                        {
                            "id": "fb5636df-0e16-4ae0-ae25-0d3248405432",
                            "optionId": "b9a3d57e-1ad3-4bc3-a7e4-53c4eafa8a9f",
                            "type": "text",
                            "url": null,
                            "text": "This is it",
                            "linePosition": 0
                        }
                    ]
                }
            ]
        },
        {
            "id": "fb5bf3e1-a1bf-4b92-8b47-7e3f89867528",
            "examId": "56188b72-6faa-436e-8108-bcc35a3ed2d2",
            "answer": "9623259d-1620-4a65-85dd-635367db5204",
            "context": [
                {
                    "id": "5821bde8-bd9b-4b9a-97f3-c60b08213138",
                    "questionId": "fb5bf3e1-a1bf-4b92-8b47-7e3f89867528",
                    "linePosition": 0,
                    "type": "text",
                    "url": null,
                    "text": "This is the question"
                },
                {
                    "id": "6945280e-5ef7-4e70-bac6-f85472f237f5",
                    "questionId": "fb5bf3e1-a1bf-4b92-8b47-7e3f89867528",
                    "linePosition": 1,
                    "type": "image",
                    "url": "1JwhzObehwOWuc-2Af5llKwcuyV2js9tn",
                    "text": null
                }
            ],
            "options": [
                {
                    "id": "4e2859d1-6358-4058-b58c-36efc8b0e6d7",
                    "questionId": "fb5bf3e1-a1bf-4b92-8b47-7e3f89867528",
                    "context": [
                        {
                            "id": "860f21c4-791f-4c3a-9458-105c53e6aceb",
                            "optionId": "4e2859d1-6358-4058-b58c-36efc8b0e6d7",
                            "type": "text",
                            "url": null,
                            "text": "Hello how are you",
                            "linePosition": 0
                        },
                        {
                            "id": "cf126d93-82b0-4e46-a2a9-2f0b76593788",
                            "optionId": "4e2859d1-6358-4058-b58c-36efc8b0e6d7",
                            "type": "image",
                            "url": "1brrU9Om0UM0G8gXDz9pG0tRTTi1pXAy1",
                            "text": null,
                            "linePosition": 1
                        }
                    ]
                },
                {
                    "id": "9623259d-1620-4a65-85dd-635367db5204",
                    "questionId": "fb5bf3e1-a1bf-4b92-8b47-7e3f89867528",
                    "context": [
                        {
                            "id": "38a64ba2-59bf-4dba-ab87-a3b977e720fa",
                            "optionId": "9623259d-1620-4a65-85dd-635367db5204",
                            "type": "text",
                            "url": null,
                            "text": "This is it",
                            "linePosition": 0
                        }
                    ]
                }
            ]
        },
        {
            "id": "57a5d165-94bf-4821-864b-06612c1cccdc",
            "examId": "56188b72-6faa-436e-8108-bcc35a3ed2d2",
            "answer": "3dcbfcfe-4582-43e6-9152-42915c8c68b4",
            "context": [
                {
                    "id": "a314f110-0447-4a38-a3e7-bd8b947ee917",
                    "questionId": "57a5d165-94bf-4821-864b-06612c1cccdc",
                    "linePosition": 0,
                    "type": "text",
                    "url": null,
                    "text": "This is the question"
                },
                {
                    "id": "caeeb814-9b34-4179-aaa7-fe3058aba83c",
                    "questionId": "57a5d165-94bf-4821-864b-06612c1cccdc",
                    "linePosition": 1,
                    "type": "image",
                    "url": "1JwhzObehwOWuc-2Af5llKwcuyV2js9tn",
                    "text": null
                }
            ],
            "options": [
                {
                    "id": "f7e24afb-2de1-4c7e-a888-b7e8e4c5eb17",
                    "questionId": "57a5d165-94bf-4821-864b-06612c1cccdc",
                    "context": [
                        {
                            "id": "abe4011e-673d-433b-9194-1014a53b8af3",
                            "optionId": "f7e24afb-2de1-4c7e-a888-b7e8e4c5eb17",
                            "type": "text",
                            "url": null,
                            "text": "Hello how are you",
                            "linePosition": 0
                        },
                        {
                            "id": "17609e00-21de-4a71-a9fc-3b9c15f92e54",
                            "optionId": "f7e24afb-2de1-4c7e-a888-b7e8e4c5eb17",
                            "type": "image",
                            "url": "1brrU9Om0UM0G8gXDz9pG0tRTTi1pXAy1",
                            "text": null,
                            "linePosition": 1
                        }
                    ]
                },
                {
                    "id": "3dcbfcfe-4582-43e6-9152-42915c8c68b4",
                    "questionId": "57a5d165-94bf-4821-864b-06612c1cccdc",
                    "context": [
                        {
                            "id": "daf2da1c-5e86-4925-ac85-14de62546590",
                            "optionId": "3dcbfcfe-4582-43e6-9152-42915c8c68b4",
                            "type": "text",
                            "url": null,
                            "text": "This is it",
                            "linePosition": 0
                        }
                    ]
                }
            ]
        },
        {
            "id": "eb26f930-4fbc-4438-8620-8728591554a1",
            "examId": "56188b72-6faa-436e-8108-bcc35a3ed2d2",
            "answer": "a9a12a60-ecc9-4e58-b7bd-5d9ce3038055",
            "context": [
                {
                    "id": "28ae4d5d-7b6a-4270-850f-4f0a35728ad9",
                    "questionId": "eb26f930-4fbc-4438-8620-8728591554a1",
                    "linePosition": 0,
                    "type": "text",
                    "url": null,
                    "text": "This is the question"
                },
                {
                    "id": "67ba2abf-557f-411b-8de7-41b2e77504cb",
                    "questionId": "eb26f930-4fbc-4438-8620-8728591554a1",
                    "linePosition": 1,
                    "type": "image",
                    "url": "1JwhzObehwOWuc-2Af5llKwcuyV2js9tn",
                    "text": null
                }
            ],
            "options": [
                {
                    "id": "45160c1e-a501-43d0-ba73-a4ca3a495743",
                    "questionId": "eb26f930-4fbc-4438-8620-8728591554a1",
                    "context": [
                        {
                            "id": "878e7cda-3e51-4981-a122-166f8365967d",
                            "optionId": "45160c1e-a501-43d0-ba73-a4ca3a495743",
                            "type": "text",
                            "url": null,
                            "text": "Hello how are you",
                            "linePosition": 0
                        },
                        {
                            "id": "9a14f27d-2654-4f1d-ba54-2a4abeeb6dfb",
                            "optionId": "45160c1e-a501-43d0-ba73-a4ca3a495743",
                            "type": "image",
                            "url": "1brrU9Om0UM0G8gXDz9pG0tRTTi1pXAy1",
                            "text": null,
                            "linePosition": 1
                        }
                    ]
                },
                {
                    "id": "a9a12a60-ecc9-4e58-b7bd-5d9ce3038055",
                    "questionId": "eb26f930-4fbc-4438-8620-8728591554a1",
                    "context": [
                        {
                            "id": "2c897306-f081-418a-bce0-0ccabc97539e",
                            "optionId": "a9a12a60-ecc9-4e58-b7bd-5d9ce3038055",
                            "type": "text",
                            "url": null,
                            "text": "This is it",
                            "linePosition": 0
                        }
                    ]
                }
            ]
        },
        {
            "id": "4ddb1c3c-24b1-40dd-b6d4-2a7e106bcade",
            "examId": "56188b72-6faa-436e-8108-bcc35a3ed2d2",
            "answer": "4f71e063-fcc2-44f4-82db-8e357fd45cb4",
            "context": [
                {
                    "id": "011cc938-4c80-4d49-9436-10c3a2ffcdf7",
                    "questionId": "4ddb1c3c-24b1-40dd-b6d4-2a7e106bcade",
                    "linePosition": 0,
                    "type": "text",
                    "url": null,
                    "text": "This is the question"
                },
                {
                    "id": "bd927bfc-badf-4a80-a09f-3dd4ffff9f74",
                    "questionId": "4ddb1c3c-24b1-40dd-b6d4-2a7e106bcade",
                    "linePosition": 1,
                    "type": "image",
                    "url": "1JwhzObehwOWuc-2Af5llKwcuyV2js9tn",
                    "text": null
                }
            ],
            "options": [
                {
                    "id": "c66985ed-145c-440b-abc8-a6e3030c7f8f",
                    "questionId": "4ddb1c3c-24b1-40dd-b6d4-2a7e106bcade",
                    "context": [
                        {
                            "id": "6b088221-3daa-4d27-afb9-b22bd36bc481",
                            "optionId": "c66985ed-145c-440b-abc8-a6e3030c7f8f",
                            "type": "text",
                            "url": null,
                            "text": "Hello how are you",
                            "linePosition": 0
                        },
                        {
                            "id": "c960df66-f5c3-4874-8f8a-0a18c9dc4e48",
                            "optionId": "c66985ed-145c-440b-abc8-a6e3030c7f8f",
                            "type": "image",
                            "url": "1brrU9Om0UM0G8gXDz9pG0tRTTi1pXAy1",
                            "text": null,
                            "linePosition": 1
                        }
                    ]
                },
                {
                    "id": "4f71e063-fcc2-44f4-82db-8e357fd45cb4",
                    "questionId": "4ddb1c3c-24b1-40dd-b6d4-2a7e106bcade",
                    "context": [
                        {
                            "id": "2d553ca1-8a57-4c83-915f-40505b74d9f4",
                            "optionId": "4f71e063-fcc2-44f4-82db-8e357fd45cb4",
                            "type": "text",
                            "url": null,
                            "text": "This is it",
                            "linePosition": 0
                        }
                    ]
                }
            ]
        },
        {
            "id": "2f31a280-6ae9-435d-a884-0db2149359f9",
            "examId": "56188b72-6faa-436e-8108-bcc35a3ed2d2",
            "answer": "bc66f362-554e-467d-9398-4800b3703bf1",
            "context": [
                {
                    "id": "8bb12684-26f4-4612-a49f-697ce917a5b9",
                    "questionId": "2f31a280-6ae9-435d-a884-0db2149359f9",
                    "linePosition": 0,
                    "type": "text",
                    "url": null,
                    "text": "This is the question"
                },
                {
                    "id": "a69a7c4d-d33c-4d34-951c-9dcc4c64337b",
                    "questionId": "2f31a280-6ae9-435d-a884-0db2149359f9",
                    "linePosition": 1,
                    "type": "image",
                    "url": "1JwhzObehwOWuc-2Af5llKwcuyV2js9tn",
                    "text": null
                }
            ],
            "options": [
                {
                    "id": "c92340a9-bbaf-4061-8ee3-56adf3a55d16",
                    "questionId": "2f31a280-6ae9-435d-a884-0db2149359f9",
                    "context": [
                        {
                            "id": "41d04cc3-cc66-4d2e-9dc3-fd1102fa3465",
                            "optionId": "c92340a9-bbaf-4061-8ee3-56adf3a55d16",
                            "type": "text",
                            "url": null,
                            "text": "Hello how are you",
                            "linePosition": 0
                        },
                        {
                            "id": "5ce80990-9643-49fe-ba24-24d629961354",
                            "optionId": "c92340a9-bbaf-4061-8ee3-56adf3a55d16",
                            "type": "image",
                            "url": "1brrU9Om0UM0G8gXDz9pG0tRTTi1pXAy1",
                            "text": null,
                            "linePosition": 1
                        }
                    ]
                },
                {
                    "id": "bc66f362-554e-467d-9398-4800b3703bf1",
                    "questionId": "2f31a280-6ae9-435d-a884-0db2149359f9",
                    "context": [
                        {
                            "id": "aeeda8ef-5d7b-40df-b743-d5ad257aee5a",
                            "optionId": "bc66f362-554e-467d-9398-4800b3703bf1",
                            "type": "text",
                            "url": null,
                            "text": "This is it",
                            "linePosition": 0
                        }
                    ]
                }
            ]
        }
    ]`)
  );

  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};
