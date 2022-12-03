{ pkgs }: {
	deps = [
		pkgs.rustup
  pkgs.rustc
  pkgs.wasm-pack
  pkgs.cargo
  pkgs.nodejs-18_x
        pkgs.nodePackages.typescript-language-server
        pkgs.nodePackages.yarn
        pkgs.replitPackages.jest
	];
}