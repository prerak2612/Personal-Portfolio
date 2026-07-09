"use client";

export function CommandCenterScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="command-stars" />
      <div className="command-scene">
        <div className="holo-core">
          <span className="core-shell" />
          <span className="core-ring ring-a" />
          <span className="core-ring ring-b" />
          <span className="core-ring ring-c" />
        </div>
        <div className="lab-deck">
          <span />
          <span />
          <span />
        </div>
        <div className="data-panel panel-a">
          <b>FULL-STACK</b>
          <i />
        </div>
        <div className="data-panel panel-b">
          <b>AI SYSTEMS</b>
          <i />
        </div>
        <div className="data-panel panel-c">
          <b>20K+ USERS</b>
          <i />
        </div>
        <div className="data-panel panel-d">
          <b>RAG + OCR</b>
          <i />
        </div>
      </div>
    </div>
  );
}
