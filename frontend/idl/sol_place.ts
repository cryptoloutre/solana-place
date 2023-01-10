export type SolPlace = {
  "version": "0.1.0",
  "name": "sol_place",
  "instructions": [
    {
      "name": "initializeVault",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializePlayer",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createPixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "posX",
          "type": "u8"
        },
        {
          "name": "posY",
          "type": "u8"
        },
        {
          "name": "initColR",
          "type": "u8"
        },
        {
          "name": "initColG",
          "type": "u8"
        },
        {
          "name": "initColB",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newColR",
          "type": "u8"
        },
        {
          "name": "newColG",
          "type": "u8"
        },
        {
          "name": "newColB",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawVault",
      "accounts": [
        {
          "name": "withdrawer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountOfLamports",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pixel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "posX",
            "type": "u8"
          },
          {
            "name": "posY",
            "type": "u8"
          },
          {
            "name": "colR",
            "type": "u8"
          },
          {
            "name": "colG",
            "type": "u8"
          },
          {
            "name": "colB",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "lvl",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "withdrawer",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pixelPlayedCount",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "PixelChanged",
      "fields": [
        {
          "name": "posX",
          "type": "u8",
          "index": false
        },
        {
          "name": "posY",
          "type": "u8",
          "index": false
        },
        {
          "name": "colR",
          "type": "u8",
          "index": false
        },
        {
          "name": "colG",
          "type": "u8",
          "index": false
        },
        {
          "name": "colB",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "PixelPlayedChanged",
      "fields": [
        {
          "name": "pixelPlayed",
          "type": "u16",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidTime",
      "msg": "The event has not yet started or has ended"
    },
    {
      "code": 6001,
      "name": "InvalidXCoordinate",
      "msg": "The given X co-ordinate is not between 0-99"
    },
    {
      "code": 6002,
      "name": "InvalidYCoordinate",
      "msg": "The given Y co-ordinate is not between 0-99"
    },
    {
      "code": 6003,
      "name": "InvalidRColor",
      "msg": "The given R color is not between 0-255"
    },
    {
      "code": 6004,
      "name": "InvalidGColor",
      "msg": "The given G color is not between 0-255"
    },
    {
      "code": 6005,
      "name": "InvalidBColor",
      "msg": "The given B color is not between 0-255"
    },
    {
      "code": 6006,
      "name": "InvalidLamportsAmount",
      "msg": "Not enough lamport"
    }
  ]
};

export const IDL: SolPlace = {
  "version": "0.1.0",
  "name": "sol_place",
  "instructions": [
    {
      "name": "initializeVault",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializePlayer",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createPixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "posX",
          "type": "u8"
        },
        {
          "name": "posY",
          "type": "u8"
        },
        {
          "name": "initColR",
          "type": "u8"
        },
        {
          "name": "initColG",
          "type": "u8"
        },
        {
          "name": "initColB",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newColR",
          "type": "u8"
        },
        {
          "name": "newColG",
          "type": "u8"
        },
        {
          "name": "newColB",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawVault",
      "accounts": [
        {
          "name": "withdrawer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountOfLamports",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pixel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "posX",
            "type": "u8"
          },
          {
            "name": "posY",
            "type": "u8"
          },
          {
            "name": "colR",
            "type": "u8"
          },
          {
            "name": "colG",
            "type": "u8"
          },
          {
            "name": "colB",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "lvl",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "withdrawer",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pixelPlayedCount",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "PixelChanged",
      "fields": [
        {
          "name": "posX",
          "type": "u8",
          "index": false
        },
        {
          "name": "posY",
          "type": "u8",
          "index": false
        },
        {
          "name": "colR",
          "type": "u8",
          "index": false
        },
        {
          "name": "colG",
          "type": "u8",
          "index": false
        },
        {
          "name": "colB",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "PixelPlayedChanged",
      "fields": [
        {
          "name": "pixelPlayed",
          "type": "u16",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidTime",
      "msg": "The event has not yet started or has ended"
    },
    {
      "code": 6001,
      "name": "InvalidXCoordinate",
      "msg": "The given X co-ordinate is not between 0-99"
    },
    {
      "code": 6002,
      "name": "InvalidYCoordinate",
      "msg": "The given Y co-ordinate is not between 0-99"
    },
    {
      "code": 6003,
      "name": "InvalidRColor",
      "msg": "The given R color is not between 0-255"
    },
    {
      "code": 6004,
      "name": "InvalidGColor",
      "msg": "The given G color is not between 0-255"
    },
    {
      "code": 6005,
      "name": "InvalidBColor",
      "msg": "The given B color is not between 0-255"
    },
    {
      "code": 6006,
      "name": "InvalidLamportsAmount",
      "msg": "Not enough lamport"
    }
  ]
};
