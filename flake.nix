{
  description = "small cli tool for expanding emmet expressions";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        packages = rec {
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            delta
          ];
        };
      }
    );
}
