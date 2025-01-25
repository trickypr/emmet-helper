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
          emmet-helper = pkgs.buildNpmPackage {
            pname = "emmet-helper";
            version = "1.0.0";
            src = self;
            npmDepsHash = "sha256-mF4RNqKyIVjBFYjL8ZFst7hc29UxxWJnQLTzuCQW+b4=";
            npmInstallFlags = [ "--omit=dev" ];
            dontNpmBuild = true;
          };
          default = emmet-helper;
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
