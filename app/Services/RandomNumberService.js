(function () {
    function randomNumberService() {

        var m_w = 123456789;
        var m_z = 987654321;
        var mask = 0xffffffff;

        // Takes any integer
        this.SetSeed = function (i) {
            m_w = i;
        }

        // Returns number between 0 (inclusive) and 1.0 (exclusive),
        // just like Math.random().
        this.Random = function (useMathRandom) {
            useMathRandom = useMathRandom || false;

            if (useMathRandom) {
                return Math.random();
            };

            m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
            m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
            var result = ((m_z << 16) + m_w) & mask;
            result /= 4294967296;
            return result + 0.5;
        }

        // Returns a random integer between min (included) and max (excluded)
        // Using Math.round() will give you a non-uniform distribution!
        this.GetRandomInt = function (min, max) {
            return Math.floor(this.Random() * (max - min)) + min;
        }
    };
    
    learningJavascriptApp.service('RandomNumberService', randomNumberService);
})();