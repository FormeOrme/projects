var lfo, hfo, modulationGain;

function setupRoutingGraph() {
    var context = new AudioContext();
    // Create the low frequency oscillator that supplies the modulation signal
    lfo = context.createOscillator();
    lfo.frequency.value = 1.0;
    // Create the high frequency oscillator to be modulated
    hfo = context.createOscillator();
    hfo.frequency.value = 440.0;
    // Create a gain node whose gain determines the amplitude of the modulation signal
    modulationGain = context.createGain();
    modulationGain.gain.value = 50;
    // Configure the graph and start the oscillators
    lfo.connect(modulationGain);
    modulationGain.connect(hfo.detune);
    hfo.connect(context.destination);
    hfo.start(0);
    lfo.start(0);
}

function stop(){
    hfo.stop();
    lfo.stop();
}